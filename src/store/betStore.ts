import { _GettersTree, defineStore, StoreDefinition } from 'pinia'
import { Bet } from '@/types/Firestore/Bets'

type State = {
  bet: null | Bet
  needRemove: boolean
}

type Actions = {
  setBet(user: Bet | null): void
  setNeedRemove(need: boolean): void
}

export const useBetStore: StoreDefinition<
  'bet',
  State,
  _GettersTree<State>,
  Actions
> = defineStore('bet', {
  state: () => {
    return {
      bet: null,
      needRemove: false
    } as State
  },
  actions: {
    setBet(bet: Bet | null) {
      this.bet = bet
    },
    setNeedRemove(need: boolean) {
      this.needRemove = need
    }
  }
})
