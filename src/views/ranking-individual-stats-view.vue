<template>
  <div class="mt-[10px]">
    <!-- @ts-ignore -->
    <RankingStatsCard
      title="Classement Statistiques individuelles"
      :ranking="usersStats as any"
    />
  </div>
</template>

<script lang="ts" setup>
import RankingStatsCard from '@/components/Cards/Ranking/RankingStatsCard.vue'
import { onMounted, ref } from 'vue'
import { FirestoreStats } from '@/types/Firestore/Statistiques'
import { useTournoi } from '@/composables/useTournoi'

const { getAllStats } = useTournoi()
const usersStats = ref<Array<Partial<FirestoreStats>>>([])
onMounted(async () => {
  usersStats.value = await getAllStats()
})
</script>
