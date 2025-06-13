// Import the functions you need from the SDKs you need
import { User } from '@/types/Firestore/User'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { getMessaging } from 'firebase/messaging'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const messaging = getMessaging(app)

// Collections
export const usersRef = collection(db, 'users')
export const statsRef = collection(db, 'stats')
export const betsRef = collection(db, 'bets')

export const betsVotesRef = (betId: string) =>
  collection(db, `bets/${betId}/bets`)

export const betsFinalVotesRef = (betId: string) =>
  collection(db, `bets/${betId}/votes`)

export const getUserBet = async (betId: string, userId: string) => {
  const q = query(betsVotesRef(betId), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.ref)[0]
}

export const getUserVote = async (betId: string, userId: string) => {
  const q = query(betsFinalVotesRef(betId), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => doc.ref)[0]
}

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(usersRef)
  return querySnapshot.docs.map(
    (document) =>
      ({
        ...document.data(),
        id: document.id
      } as User)
  )
}
export const getAllPlayers = async () => {
  const querySnapshot = await getDocs(usersRef)
  return querySnapshot.docs
    .filter((u) => u.data().isPlayer)
    .map(
      (document) =>
        ({
          ...document.data(),
          id: document.id
        } as User)
    )
}

export const getAllBets = async () => {
  return await getDocs(betsRef)
}

export const duplicateStatsToOldStats = async () => {
  const statsSnapshot = await getDocs(statsRef)
  const promises = statsSnapshot.docs.map((document) => {
    // Write each doc to old_stats with the same ID and data
    return setDoc(doc(db, 'old_stats_2023', document.id), document.data())
  })
  await Promise.all(promises)
  console.log('Stats collection duplicated to old_stats_2023.')
}
