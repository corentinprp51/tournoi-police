import { _GettersTree, defineStore, StoreDefinition } from 'pinia'
import { User as UserFirestore } from '@/types/Firestore/User'
import { FirestoreStats } from '@/types/Firestore/Statistiques'

type State = {
  user: null | UserFirestore
  needLogout: boolean

  stats: Array<FirestoreStats>
}

type Actions = {
  setUser(user: UserFirestore | null): void
  setNeedLogout(need: boolean): void

  setStats(stats: FirestoreStats): void
}

export const useUserStore: StoreDefinition<
  'user',
  State,
  _GettersTree<State>,
  Actions
> = defineStore('user', {
  state: () => {
    return {
      user: null,
      needLogout: false,
      stats: []
    } as State
  },
  actions: {
    setUser(user: UserFirestore | null) {
      this.user = user
    },
    setNeedLogout(need: boolean) {
      this.needLogout = need
    },
    setStats(stats: FirestoreStats) {
      const stat = this.stats.find((el) => el.gameId === stats.gameId)
      if (stat) {
        this.stats = this.stats.filter((el) => el.gameId !== stat.gameId)
      }
      this.stats.push(stats)
      console.log('Stats Store after set: ', this.stats)
    }
  }
})
