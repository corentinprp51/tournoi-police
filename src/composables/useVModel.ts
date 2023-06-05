import { computed, getCurrentInstance } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useVModel<T = any>(props: any, propName: string) {
  const vm = getCurrentInstance()?.proxy

  return computed({
    get(): T {
      return props[propName]
    },
    set(value: T) {
      vm?.$emit(`update:${propName}`, value)
    }
  })
}
