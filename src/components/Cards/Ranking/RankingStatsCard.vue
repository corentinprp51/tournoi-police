<template>
  <div>
    <div class="header px-[8px] text-[14px] font-semibold">
      {{ title }}
      <Line class="mt-[10px]" />
    </div>
    <div
      v-if="ranking.length > 0"
      class="flex justify-end text-[12px] text-[#989898] font-light mr-[11px] mt-[10px]"
    >
      <div class="w-[35%] flex justify-between">
        <span>Arr</span>
        <span>P.P</span>
        <span>P.D</span>
        <span>Buts</span>
      </div>
    </div>
    <div
      v-else
      class="mt-[15px] px-[8px]"
    >
      <span class="text-[14px] text-[#989898] italic font-light">
        Aucune stats pour le moment
      </span>
    </div>
    <div class="flex flex-col mt-[7px]">
      <div class="flex flex-col">
        <div
          v-for="(playerStats, index) in ranking"
          :key="index"
        >
          <SimpleRankingStatsLine
            :player-stats="playerStats"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Line from '@/components/Cards/Header/Line.vue'
import { FirestoreStats } from '@/types/Firestore/Statistiques'
import SimpleRankingStatsLine from '@/components/Cards/Ranking/SimpleRankingStatsLine.vue'

type RankingCard = {
  title: string
  ranking: Array<FirestoreStats>
}

defineProps<RankingCard>()
</script>

<style scoped></style>
