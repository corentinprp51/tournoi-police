import { createApp, markRaw } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
createApp(App).use(pinia).use(router).mount('#app')
registerSW({ immediate: true })
