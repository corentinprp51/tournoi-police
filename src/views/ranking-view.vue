<template>
  <div class="mt-[10px]">
    <RankingMatchCard
      :title="`Classement Général`"
      :ranking="rankingTeams"
    />
  </div>
</template>

<script lang="ts" setup>
import RankingMatchCard from '@/components/Cards/Ranking/RankingMatchCard.vue'
import { onMounted, ref } from 'vue'
import { RankingTeam } from '@/types/Firestore/Ranking'
import { useTournoi } from '@/composables/useTournoi'

const rankingTeams = ref<Array<RankingTeam>>([])
const { getRanking } = useTournoi()

onMounted(async () => {
  rankingTeams.value = await getRanking()
})
</script>

<style scoped></style>
