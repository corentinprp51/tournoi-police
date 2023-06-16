<template>
  <div>
    <div class="header px-[8px] text-[14px] font-semibold">
      {{ title }}
      <Line class="mt-[10px]" />
    </div>
    <div
      class="flex justify-end text-[12px] text-[#989898] font-light mr-[11px] mt-[10px]"
    >
      <div class="w-[30%] flex justify-between">
        <span>J</span>
        <span>Buts</span>
        <span>Pts</span>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex flex-col">
        <div
          v-for="(rankingTeam, index) in ranking"
          :key="index"
        >
          <!--          <div-->
          <!--            v-if="!isFinalePhase && (index === 0 || index === 2 || index === 4)"-->
          <!--            class="text-[10px] text-[#989898] font-light pl-[10px] mt-[7px]"-->
          <!--          >-->
          <!--            <span v-if="index === 0">DEMI-FINALES</span>-->
          <!--            <span v-if="index === 2">PLACES 5 à 8</span>-->
          <!--            <span v-if="index === 4">PLACES 9-10</span>-->
          <!--          </div>-->
          <SimpleRankingLine
            :ranking-team="rankingTeam"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Line from '@/components/Cards/Header/Line.vue'
import { RankingTeam } from '@/types/Firestore/Ranking'
import SimpleRankingLine from '@/components/Cards/Ranking/SimpleRankingLine.vue'

type RankingCard = {
  title: string
  ranking: Array<RankingTeam>
}

defineProps<RankingCard>()
</script>

<style scoped></style>
