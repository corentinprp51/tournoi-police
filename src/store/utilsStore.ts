import { _GettersTree, defineStore, StoreDefinition } from 'pinia'

type State = {
  isLoading: boolean
}

type Actions = {
  setLoaderApp(isLoading: boolean): void
}

export const useUtilsStore: StoreDefinition<
  'utils',
  State,
  _GettersTree<State>,
  Actions
> = defineStore('utils', {
  state: () => {
    return {
      isLoading: false
    } as State
  },
  actions: {
    setLoaderApp(isLoading: boolean) {
      this.isLoading = isLoading
    }
  }
})
