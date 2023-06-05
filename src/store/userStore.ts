import { _GettersTree, defineStore, StoreDefinition } from 'pinia'
import { User as UserFirestore } from '@/types/Firestore/User'

type State = {
  user: null | UserFirestore
  needLogout: boolean
}

type Actions = {
  setUser(user: UserFirestore | null): void
  setNeedLogout(need: boolean): void
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
      needLogout: false
    } as State
  },
  actions: {
    setUser(user: UserFirestore | null) {
      this.user = user
    },
    setNeedLogout(need: boolean) {
      this.needLogout = need
    }
  }
})
