import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import { onAuthStateChanged, User as UserAuth } from 'firebase/auth'
import { auth, db } from '@/firebase'
import { doc, getDoc, DocumentReference } from 'firebase/firestore'
import { User } from '@/types/Firestore/User'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-view.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register-view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  const userStore = useUserStore()
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener()
        if (user && user.uid) {
          const userRef: DocumentReference<User> = doc(
            db,
            `users/${user?.uid}`
          ) as DocumentReference<User>
          getDoc<User>(userRef).then((document) => {
            userStore.setUser({
              ...(user as UserAuth),
              ...(document.data() as User)
            })
            resolve(user)
          })
        } else {
          resolve(user)
        }
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userStore.user || (await getCurrentUser())) {
      next()
      return
    } else {
      next('/login')
      return
    }
  }
  if (
    (userStore.user || (await getCurrentUser())) &&
    (to.name == 'login' || to.name == 'register')
  ) {
    next('/')
    return
  }
  next()
})

export default router
