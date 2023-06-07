<template>
  <div class="mt-[10px]">
    <RankingMatchCard
      :title="`Classement Groupe ${getGroupLetter}`"
      :ranking="rankingTeams"
    />
  </div>
</template>

<script lang="ts" setup>
import RankingMatchCard from '@/components/Cards/Ranking/RankingMatchCard.vue'
import { computed, onMounted, ref } from 'vue'
import { RankingTeam } from '@/types/Firestore/Ranking'
import { useRoute } from 'vue-router'
import { useTournoi } from '@/composables/useTournoi'

const rankingTeams = ref<Array<RankingTeam>>([])
const route = useRoute()
const getGroupLetter = computed(() =>
  route.params.groupId === '0' ? 'A' : 'B'
)
const { getRanking } = useTournoi()

onMounted(async () => {
  rankingTeams.value = await getRanking(route.params.groupId as string)
})
</script>

<style scoped></style>
