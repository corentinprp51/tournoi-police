<template>
  <div class="mt-[36px]">
    <AddStatsForm
      v-model="stats"
      @submit="handleEditStats"
    />
  </div>
</template>

<script lang="ts" setup>
import AddStatsForm from '@/components/Forms/Forms/AddStatsForm.vue'
import { computed, reactive } from 'vue'
import { Statistiques } from '@/types/Firestore/Statistiques'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useUserStore } from '@/store/userStore'
import { useRoute, useRouter } from 'vue-router'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'

const userStore = useUserStore()
const utilsStore = useUtilsStore()
const route = useRoute()
const router = useRouter()
const playerGameStats = computed(() =>
  userStore.stats.find((el) => el.gameId === route.params.id)
)

const stats = reactive<Statistiques>({
  assists: playerGameStats.value?.assists || 0,
  goalkeeper: playerGameStats.value?.goalkeeper || 0,
  nutmeg: playerGameStats.value?.nutmeg || 0,
  goals: playerGameStats.value?.goals || 0
})

const handleEditStats = async () => {
  utilsStore.setLoaderApp(true)
  const docStatsRef = doc(db, 'stats', playerGameStats.value?.id || '')
  await updateDoc(docStatsRef, stats)
  ToastesService.getInstance().success(
    'Vous venez de mettre à jour vos statistiques'
  )
  await router.go(-1)
}
</script>

<style scoped></style>
