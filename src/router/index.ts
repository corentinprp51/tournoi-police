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
    path: '/matchs',
    name: 'matchs',
    component: () => import('@/views/matchs-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/match/:id',
    name: 'match-details',
    component: () => import('@/views/match-details-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/match/:id/stats/add',
    name: 'match-stats-add',
    component: () => import('@/views/add-match-stats-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/match/:id/stats/edit',
    name: 'match-stats-edit',
    component: () => import('@/views/edit-match-stats-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/classement/:groupId',
    name: 'classement',
    component: () => import('@/views/ranking-view.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/classement/statistiques',
    name: 'classement-statistiques',
    component: () => import('@/views/ranking-individual-stats-view.vue'),
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
