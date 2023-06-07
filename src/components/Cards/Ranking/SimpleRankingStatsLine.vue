<template>
  <div
    class="flex justify-between px-[10px] bg-[#161616] py-[11px] border-b border-[rgba(87,87,87,0.27)]"
  >
    <div class="flex gap-[7px] text-[14px]">
      <span>{{ index + 1 }}</span>
      <span>-</span>
      <span>{{ playerStats.username }}</span>
    </div>
    <div class="flex w-[36%] justify-between text-[14px]">
      <span class="font-light text-[#989898]">
        {{ playerStats.goalkeeper }}
      </span>
      <span class="font-light text-[#989898]">{{ playerStats.nutmeg }}</span>
      <span class="font-light text-[#989898]">{{ playerStats.assists }}</span>
      <span>{{ playerStats.goals }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FirestoreStats } from '@/types/Firestore/Statistiques'

type RankingType = {
  playerStats: FirestoreStats
  index: number
}

defineProps<RankingType>()
</script>
