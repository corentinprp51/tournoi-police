import { ref } from 'vue'
import { Match } from '@/types/Firestore/Match'
import { useUtilsStore } from '@/store/utilsStore'
import { addMinutes, isFuture, isPast } from 'date-fns'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, statsRef } from '@/firebase'
import { FirestoreStats, Statistiques } from '@/types/Firestore/Statistiques'
import { useUserStore } from '@/store/userStore'
import { User } from '@/types/Firestore/User'
import { RankingTeam } from '@/types/Firestore/Ranking'

export const useTournoi = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL
  const matchsFdP = ref<Array<Match>>([])
  const matchsFieldA = ref<Array<Match>>([])
  const matchsFieldB = ref<Array<Match>>([])
  const match = ref<Match>({} as unknown as Match)
  const { setLoaderApp } = useUtilsStore()
  const userStore = useUserStore()

  const getMatchsFdp = async () => {
    setLoaderApp(true)
    await fetch(BASE_URL)
      .then((res) => res.json())
      .then((res: Array<Match>) => {
        matchsFdP.value = res.filter(
          (el) =>
            el.awayName === 'Fils de Flic' || el.homeName === 'Fils de Flic'
        )
      })
      .finally(() => setLoaderApp(false))
  }

  const getMatchsByGroup = async () => {
    setLoaderApp(true)
    await fetch(BASE_URL)
      .then((res) => res.json())
      .then((res: Array<Match>) => {
        matchsFieldA.value = res.filter((el) => el.field === 1)
        matchsFieldB.value = res.filter((el) => el.field === 2)
      })
      .finally(() => setLoaderApp(false))
  }

  const getMatch = async (id: string) => {
    setLoaderApp(true)
    await fetch(`${BASE_URL}/match/${id}`)
      .then((res) => res.json())
      .then((res: Match) => {
        match.value = res
      })
      .finally(() => setLoaderApp(false))
  }

  const matchIsEnded = (match: Match) => {
    if (match.startDate) {
      let matchDate = new Date(match.startDate)
      const matchHours = match.startHour.split(':')[0]
      const matchMinutes = match.startHour.split(':')[1]
      matchDate.setHours(parseInt(matchHours), parseInt(matchMinutes), 0, 0)
      matchDate = addMinutes(matchDate, 15)
      return !isFuture(matchDate)
    }
  }

  const matchIsPlaying = (match: Match) => {
    if (match.startDate) {
      const matchDate = new Date(match.startDate)
      const matchHours = match.startHour.split(':')[0]
      const matchMinutes = match.startHour.split(':')[1]
      matchDate.setHours(parseInt(matchHours), parseInt(matchMinutes), 0, 0)
      let matchEndDate = new Date(matchDate)
      matchEndDate = addMinutes(matchEndDate, 15)
      return !isFuture(matchDate) && !isPast(matchEndDate)
    }
  }

  const getStats = async (gameId: string) => {
    setLoaderApp(true)
    const q = query(statsRef, where('gameId', '==', gameId))
    const querySnapshot = await getDocs(q)
    const stats = querySnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as FirestoreStats)
    )
    stats.sort((a, b) => {
      return (
        (b.goals || 0) +
        (b.assists || 0) +
        (b.nutmeg || 0) +
        (b.goalkeeper || 0) -
        ((a.goals || 0) +
          (a.assists || 0) +
          (a.nutmeg || 0) +
          (a.goalkeeper || 0))
      )
    })
    setLoaderApp(false)
    return stats
  }

  const getIndividualStats = async () => {
    setLoaderApp(true)
    const q = query(statsRef, where('userId', '==', userStore.user?.id))
    const querySnapshot = await getDocs(q)
    const stats = querySnapshot.docs.map(
      (doc) =>
        ({
          goals: doc.data().goals,
          assists: doc.data().assists,
          goalkeeper: doc.data().goalkeeper,
          nutmeg: doc.data().nutmeg
        } as Statistiques)
    )
    setLoaderApp(false)
    if (stats.length > 0) {
      return stats.reduce((prevObject, currObject) => ({
        goals: prevObject.goals + currObject.goals,
        assists: prevObject.assists + currObject.assists,
        goalkeeper: prevObject.goalkeeper + currObject.goalkeeper,
        nutmeg: prevObject.nutmeg + currObject.nutmeg
      }))
    } else {
      return {
        goals: 0,
        assists: 0,
        goalkeeper: 0,
        nutmeg: 0
      }
    }
  }

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
  const getAllStats = async () => {
    setLoaderApp(true)
    const stats = await getAllDocs<FirestoreStats>('stats')
    const users = await getAllDocs<User>('users')
    const usersStats: Array<Partial<FirestoreStats>> = []
    users.forEach((user) => {
      const statsUser = stats
        .filter((el) => el.userId === user.id)
        .map((stat) => ({
          goals: stat.goals,
          goalkeeper: stat.goalkeeper,
          assists: stat.assists,
          nutmeg: stat.nutmeg
        }))
      if (statsUser.length > 0) {
        const statsObj: Statistiques = statsUser.reduce(
          (prevObject, currObject) =>
            ({
              goals: prevObject.goals + currObject.goals,
              assists: prevObject.assists + currObject.assists,
              goalkeeper: prevObject.goalkeeper + currObject.goalkeeper,
              nutmeg: prevObject.nutmeg + currObject.nutmeg
            } as Statistiques)
        )
        usersStats.push({
          ...statsObj,
          userId: user.id,
          username: user.username
        } as FirestoreStats)
      } else {
        usersStats.push({
          goalkeeper: 0,
          assists: 0,
          nutmeg: 0,
          goals: 0,
          userId: user.id,
          username: user.username
        } as FirestoreStats)
      }
    })
    usersStats.sort((a, b) => {
      return (
        (b.goals || 0) +
        (b.assists || 0) +
        (b.nutmeg || 0) +
        (b.goalkeeper || 0) -
        ((a.goals || 0) +
          (a.assists || 0) +
          (a.nutmeg || 0) +
          (a.goalkeeper || 0))
      )
    })
    setLoaderApp(false)
    return usersStats
  }

  const getRanking = async () => {
    setLoaderApp(true)
    const res: Array<RankingTeam> = await fetch(`${BASE_URL}/ranking`).then(
      (res) => res.json()
    )
    setLoaderApp(false)
    return res
  }

  return {
    matchsFdP,
    getMatchsFdp,
    getMatchsByGroup,
    matchsFieldA,
    matchsFieldB,
    match,
    getMatch,
    matchIsEnded,
    matchIsPlaying,
    getStats,
    getIndividualStats,
    getAllStats,
    getRanking
  }
}
