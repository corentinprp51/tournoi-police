import { RegisterForm as RegisterType } from '@/types/Forms/RegisterForm'
import { reactive, ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth, db } from '@/firebase'
import {
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'
import { User } from '@/types/Firestore/User'
import { ProfileForm } from '@/types/Forms/ProfileForm'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'

export const useAuth = () => {
  const errorForm = ref('')
  const userStore = useUserStore()
  const { setLoaderApp } = useUtilsStore()
  const router = useRouter()
  const loginForm = reactive({
    email: '',
    password: ''
  })
  const registerForm = reactive<RegisterType>({
    email: '',
    username: '',
    confirm_password: '',
    password: ''
  })
  const profileForm = reactive<ProfileForm>({
    username: userStore.user?.username || ''
  })
  const loginUser = async () => {
    resetAuthError()
    setLoaderApp(true)
    if (loginForm.email && loginForm.password) {
      signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then(async (userCredential) => {
          //Add User to the store
          const userDocRef = doc(db, 'users', userCredential.user.uid)
          const userSnapshot = await getDoc(userDocRef)
          userStore.setUser({
            ...userSnapshot.data()
          } as User)
          await router.push('/')
        })
        .catch(() => {
          errorForm.value = `L'adresse mail et/ou le mot de passe sont incorrects`
        })
        .finally(() => setLoaderApp(false))
    } else {
      errorForm.value = `Veuillez renseigner adresse mail et/ou un mot de passe`
      setLoaderApp(false)
    }
  }
  const registerUser = async () => {
    resetAuthError()
    setLoaderApp(true)
    if (
      registerForm.email &&
      registerForm.username &&
      registerForm.password &&
      registerForm.confirm_password
    ) {
      if (registerForm.password === registerForm.confirm_password) {
        createUserWithEmailAndPassword(
          auth,
          registerForm.email,
          registerForm.password
        )
          .then(async (userCredential) => {
            // Add User to Firestore & to the store
            const userRef = doc(db, 'users', userCredential.user.uid)
            const userData = {
              id: userCredential.user.uid,
              email: registerForm.email,
              username: registerForm.username,
              created_at: serverTimestamp(),
              updated_at: null
            }
            await setDoc(userRef, userData)
            userStore.setUser(userData)
            await router.push('/')
          })
          .catch(() => {
            errorForm.value = `L'adresse e-mail est déjà utilisée`
          })
          .finally(() => setLoaderApp(false))
      } else {
        errorForm.value = 'Les deux mots de passe ne correspondent pas'
        setLoaderApp(false)
      }
    } else {
      errorForm.value = 'Veuillez remplir tous les champs du formulaire'
      setLoaderApp(false)
    }
  }

  const logoutUser = async () => {
    setLoaderApp(true)
    signOut(auth)
      .then(() => {
        userStore.setUser(null)
        userStore.setNeedLogout(false)
        router.push('/login')
        ToastesService.getInstance().success('Vous venez de vous déconnecter')
      })
      .finally(() => setLoaderApp(false))
  }

  const updateUser = async () => {
    setLoaderApp(true)
    const userRef = doc(db, 'users', userStore.user?.id || '')
    updateDoc(userRef, {
      ...profileForm,
      updated_at: serverTimestamp()
    })
      .then(() => {
        userStore.setUser({
          ...userStore.user,
          username: profileForm.username
        } as User)
        ToastesService.getInstance().success('Profil mis à jour !')
      })
      .finally(() => setLoaderApp(false))
  }

  const resetAuthError = () => {
    errorForm.value = ''
  }

  return {
    errorForm,
    loginUser,
    registerUser,
    registerForm,
    loginForm,
    logoutUser,
    profileForm,
    updateUser
  }
}
