// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getMessaging } from 'firebase/messaging'
import { User } from '@/types/Firestore/User'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
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
