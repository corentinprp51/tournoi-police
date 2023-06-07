<template>
  <div class="h-[calc(100dvh-50px-120px)] overflow-y-scroll">
    <MatchsCard
      class="mt-[32px]"
      title="Matchs des FdP"
      subtitle="Les matchs disputés par votre équipe aujourd'hui"
      :group-id="`1`"
      :matchs="matchsFdP"
    />
    <StatistiquesCard
      title="Statistiques individuelles"
      subtitle="Vos stats individuelles"
      :stats="stats"
      class="mt-[15px]"
    />
  </div>
</template>

<script lang="ts" setup>
import MatchsCard from '@/components/Cards/Matchs/MatchsCard.vue'
import { onMounted, ref } from 'vue'
import { Statistiques } from '@/types/Firestore/Statistiques'
import StatistiquesCard from '@/components/Cards/Matchs/StatistiquesCard.vue'
import { useTournoi } from '@/composables/useTournoi'

const { matchsFdP, getMatchsFdp, getIndividualStats } = useTournoi()

onMounted(async () => {
  await getMatchsFdp()
  stats.value = await getIndividualStats()
})

const stats = ref<Statistiques>({
  goals: 0,
  assists: 0,
  nutmeg: 0,
  goalkeeper: 0
})
</script>

<style scoped></style>
