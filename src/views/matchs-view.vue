<template>
  <div class="h-[calc(100vh-50px-120px)] overflow-y-scroll">
    <div>
      <MatchsCard
        class="mt-[20px]"
        title="Terrain 1"
        subtitle="Les matchs disputés sur le terrain 1"
        :matchs="matchsFieldA"
        group-id="0"
        :final-phase="true"
      />
      <MatchsCard
        class="mt-[32px]"
        title="Terrain 2"
        subtitle="Les matchs disputés sur le terrain 2"
        :matchs="matchsFieldB"
        :final-phase="true"
        group-id="1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MatchsCard from '@/components/Cards/Matchs/MatchsCard.vue'
import { onMounted } from 'vue'
import { useTournoi } from '@/composables/useTournoi'

const { getMatchsByGroup, matchsFieldA, matchsFieldB } = useTournoi()

onMounted(async () => {
  await getMatchsByGroup()
})
</script>

<style scoped></style>
