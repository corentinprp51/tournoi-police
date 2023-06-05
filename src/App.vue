<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import Header from '@/components/Layouts/Header.vue'
import ToastHandler from '@/components/Toasts/toast-handler.vue'
import { useUtilsStore } from '@/store/utilsStore'
import Loader from '@/components/Loader/Loader.vue'

const route = useRoute()
const router = useRouter()
const isAppMounted = ref(false)
const utilsStore = useUtilsStore()
const isOnAuthRoute = computed(
  () => route.name === 'login' || route.name === 'register'
)
// const isLoadingApp = computed(() => utilsStore.isLoading)
onMounted(async () => {
  await router.isReady()
  isAppMounted.value = true
})
</script>
<template>
  <div class="flex flex-col h-[100dvh] bg-default text-white">
    <div
      v-if="utilsStore.isLoading"
      class="absolute top-0 z-[100] h-[100dvh] bg-[rgba(0,0,0,0.7)] w-full flex items-center justify-center"
    >
      <Loader />
    </div>
    <toast-handler />
    <Header v-if="isAppMounted && !isOnAuthRoute" />
    <div class="px-[15px] flex flex-col">
      <router-view />
    </div>
  </div>
</template>
