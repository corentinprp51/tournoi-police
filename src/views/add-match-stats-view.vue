<template>
  <div class="mt-[36px]">
    <AddStatsForm
      v-model="stats"
      @submit="handleAddStats"
    />
  </div>
</template>

<script lang="ts" setup>
import AddStatsForm from '@/components/Forms/Forms/AddStatsForm.vue'
import { reactive } from 'vue'
import { Statistiques } from '@/types/Firestore/Statistiques'
import { addDoc } from 'firebase/firestore'
import { statsRef } from '@/firebase'
import { useUserStore } from '@/store/userStore'
import { useRoute, useRouter } from 'vue-router'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'

const stats = reactive<Statistiques>({
  assists: 0,
  goalkeeper: 0,
  nutmeg: 0,
  goals: 0
})
const userStore = useUserStore()
const utilsStore = useUtilsStore()
const route = useRoute()
const router = useRouter()

const handleAddStats = async () => {
  utilsStore.setLoaderApp(true)
  await addDoc(statsRef, {
    ...stats,
    username: userStore.user?.username || '',
    userId: userStore.user?.id || '',
    gameId: route.params.id as string
  })
  ToastesService.getInstance().success(
    'Vous venez de mettre à jour vos statistiques'
  )
  await router.go(-1)
}
</script>

<style scoped></style>
