<template>
  <div
    class="flex justify-between px-[10px] bg-[#161616] py-[11px] border-b border-[rgba(87,87,87,0.27)]"
  >
    <div class="flex gap-[7px] text-[14px]">
      <span>{{ index + 1 }}</span>
      <span>-</span>
      <span>{{ rankingTeam.teamName ? rankingTeam.teamName : '/' }}</span>
    </div>
    <div class="flex w-[30%] justify-between text-[14px]">
      <span class="font-light text-[#989898]">{{ rankingTeam.played }}</span>
      <span class="font-light text-[#989898]">{{ rankingTeam.goals }}</span>
      <span>{{ rankingTeam.points }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RankingTeam } from '@/types/Firestore/Ranking'

type RankingType = {
  rankingTeam: RankingTeam
  index: number
}

defineProps<RankingType>()
</script>
