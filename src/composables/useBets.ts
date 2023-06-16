import { useUserStore } from '@/store/userStore'
import { useUtilsStore } from '@/store/utilsStore'
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import {
  betsFinalVotesRef,
  betsRef,
  betsVotesRef,
  db,
  getAllUsers
} from '@/firebase'
import { Bet, BetStatus } from '@/types/Firestore/Bets'
import { isFuture } from 'date-fns'

const getAllDocs = async <T>(collectionName: string): Promise<Array<T>> => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  return querySnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id
      } as T)
  )
}
export const useBets = () => {
  const userStore = useUserStore()
  const { setLoaderApp } = useUtilsStore()
  const getAllBets = async () => {
    setLoaderApp(true)
    const bets = await getAllDocs<Bet>('bets')
    bets.sort((a, b) => {
      const dateA = new Date(a.endDate || '1970')
      const dateB = new Date(b.endDate || '1970')
      if (a.endHours) {
        dateA.setHours(
          parseInt(a.endHours.split(':')[1]),
          parseInt(a.endHours.split(':')[0]),
          0,
          0
        )
      }
      if (b.endHours) {
        dateB.setHours(
          parseInt(b.endHours.split(':')[1]),
          parseInt(b.endHours.split(':')[0]),
          0,
          0
        )
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return dateB - dateA
    })
    setLoaderApp(false)
    return bets
  }
  const getBet = async (betId: string) => {
    setLoaderApp(true)
    const betDocRef = doc(db, 'bets', betId)
    const betSnapshot = await getDoc(betDocRef)
    const betsSubRef = betsVotesRef(betId)
    const finalVotesRef = betsFinalVotesRef(betId)
    const subBetsSnapshot = await getDocs(betsSubRef)
    const subBestVotesSnapshot = await getDocs(finalVotesRef)
    const subBets = subBetsSnapshot.docs.map((doc) => ({
      username: doc.data().username,
      userId: doc.data().userId,
      vote: doc.data().vote
    }))
    const subVotes = subBestVotesSnapshot.docs.map((doc) => ({
      username: doc.data().username,
      userId: doc.data().userId,
      vote: doc.data().vote
    }))
    setLoaderApp(false)
    return {
      ...(betSnapshot.data() as Bet),
      bets: subBets,
      votes: subVotes,
      id: betId
    }
  }
  const isOwner = (bet: Bet | null) => {
    if (bet) {
      return bet.userId === userStore.user?.id
    }
    return false
  }

  const changeBetStatusIfNeeded = async (
    bet: Partial<Bet>,
    ref: DocumentReference
  ) => {
    if (bet.endDate && bet.endHours) {
      const date = new Date(bet.endDate)
      date.setHours(
        parseInt(bet.endHours.split(':')[0]),
        parseInt(bet.endHours.split(':')[1]),
        0,
        0
      )
      if (bet.status === BetStatus.TO_BET && !isFuture(date)) {
        await updateDoc(ref, {
          status: BetStatus.TO_FINAL_VOTE
        })
        return BetStatus.TO_FINAL_VOTE
      } else if (bet.status === BetStatus.TO_FINAL_VOTE) {
        const users = await getAllUsers()
        const newStatus =
          users.length === bet.votes?.length
            ? BetStatus.ENDED
            : BetStatus.TO_FINAL_VOTE
        if (newStatus !== bet.status) {
          await updateDoc(ref, {
            status: newStatus
          })
        }
      }
      return bet.status
    } else if (
      bet.status === BetStatus.TO_BET ||
      bet.status === BetStatus.TO_FINAL_VOTE
    ) {
      const users = await getAllUsers()
      let newStatus: BetStatus = bet.status
      if (bet.status === BetStatus.TO_BET) {
        newStatus =
          users.length === bet.bets?.length
            ? BetStatus.TO_FINAL_VOTE
            : BetStatus.TO_BET
      } else {
        newStatus =
          users.length === bet.votes?.length
            ? BetStatus.ENDED
            : BetStatus.TO_FINAL_VOTE
      }
      if (newStatus !== bet.status) {
        await updateDoc(ref, {
          status: newStatus
        })
      }
    }
    return bet.status
  }

  const getBetsByStatus = async (status: BetStatus) => {
    setLoaderApp(true)
    const q = query(betsRef, where('status', '==', status))
    const querySnapshot = await getDocs(q)
    const filteredBets = status === BetStatus.TO_BET ? [] : querySnapshot.docs
    if (status === BetStatus.TO_BET) {
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        const betsSubRef = betsVotesRef(querySnapshot.docs[i].id)
        const finalVotesRef = betsFinalVotesRef(querySnapshot.docs[i].id)
        const subBetsSnapshot = await getDocs(betsSubRef)
        const subBestVotesSnapshot = await getDocs(finalVotesRef)
        const subBets = subBetsSnapshot.docs.map((doc) => ({
          username: doc.data().username,
          userId: doc.data().userId,
          vote: doc.data().vote
        }))
        const subVotes = subBestVotesSnapshot.docs.map((doc) => ({
          username: doc.data().username,
          userId: doc.data().userId,
          vote: doc.data().vote
        }))
        const statusDoc = await changeBetStatusIfNeeded(
          { ...querySnapshot.docs[i].data(), votes: subVotes, bets: subBets },
          querySnapshot.docs[i].ref
        )
        if (statusDoc === status) {
          filteredBets.push(querySnapshot.docs[i])
        }
      }
    }
    const bets = filteredBets.map(
      (document) =>
        ({
          ...document.data(),
          id: document.id
        } as Bet)
    )
    bets.sort((a, b) => {
      const dateA = new Date(a.endDate || '1970')
      const dateB = new Date(b.endDate || '1970')
      if (a.endHours) {
        dateA.setHours(
          parseInt(a.endHours.split(':')[1]),
          parseInt(a.endHours.split(':')[0]),
          0,
          0
        )
      }
      if (b.endHours) {
        dateB.setHours(
          parseInt(b.endHours.split(':')[1]),
          parseInt(b.endHours.split(':')[0]),
          0,
          0
        )
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return dateB - dateA
    })
    setLoaderApp(false)
    return bets
  }

  return {
    getAllBets,
    getBet,
    getBetsByStatus,
    isOwner
  }
}
