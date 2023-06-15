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
      <div class="flex justify-between">
        <span>Votes</span>
      </div>
    </div>
    <div
      v-else
      class="mt-[15px] px-[8px]"
    >
      <span class="text-[14px] text-[#989898] italic font-light">
        Aucun vote/pari pour le moment
      </span>
    </div>
    <div class="flex flex-col mt-[7px]">
      <div class="flex flex-col">
        <div
          v-for="(playerVotes, index) in ranking"
          :key="index"
        >
          <SimpleRankingBetsLine
            :player-votes="playerVotes"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Line from '@/components/Cards/Header/Line.vue'
import { RankingVotes } from '@/types/Firestore/Bets'
import SimpleRankingBetsLine from '@/components/Cards/Ranking/SimpleRankingBetsLine.vue'

type RankingCard = {
  title: string
  ranking: Array<RankingVotes>
}

defineProps<RankingCard>()
</script>

<style scoped></style>
