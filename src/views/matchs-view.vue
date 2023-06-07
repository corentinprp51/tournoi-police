<template>
  <div class="h-[calc(100dvh-50px-120px)] overflow-y-scroll">
    <MatchsCard
      class="mt-[32px]"
      title="Groupe A"
      subtitle="Les matchs disputés par le groupe A"
      :matchs="matchsGroupA"
      group-id="0"
    />
    <MatchsCard
      class="mt-[32px]"
      title="Groupe B"
      subtitle="Les matchs disputés par le groupe B"
      :matchs="matchsGroupB"
      group-id="1"
    />
  </div>
</template>

<script lang="ts" setup>
import MatchsCard from '@/components/Cards/Matchs/MatchsCard.vue'
import { onMounted } from 'vue'
import { useTournoi } from '@/composables/useTournoi'

const { getMatchsByGroup, matchsGroupA, matchsGroupB } = useTournoi()

onMounted(async () => {
  await getMatchsByGroup()
})
</script>

<style scoped></style>
