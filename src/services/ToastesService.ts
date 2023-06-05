import { markRaw, Raw, ref, Ref } from 'vue'
import SuccessToast from '@/components/Toasts/SuccessToast.vue'
import ErrorToast from '@/components/Toasts/ErrorToast.vue'

type FlashComponent = typeof SuccessToast | typeof ErrorToast

export default class ToastesService {
  private static instance: ToastesService
  components: Ref<Array<{ component: Raw<FlashComponent>; message: string }>> =
    ref([])
  TIMEOUT = 4000

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): ToastesService {
    if (!ToastesService.instance) {
      ToastesService.instance = new ToastesService()
    }
    return ToastesService.instance
  }

  public success(msg = 'Succès'): void {
    const component = markRaw<typeof SuccessToast>(SuccessToast)
    this.components.value.push({
      component,
      message: msg
    })
    setTimeout(() => {
      this.components.value.shift()
    }, this.TIMEOUT)
  }

  public error(msg = 'Erreur'): void {
    const component = markRaw<typeof ErrorToast>(ErrorToast)
    this.components.value.push({
      component,
      message: msg
    })
    setTimeout(() => {
      this.components.value.shift()
    }, this.TIMEOUT)
  }
}
