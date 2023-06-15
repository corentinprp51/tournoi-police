<template>
  <div
    class="flex justify-between px-[10px] bg-[#161616] py-[11px] border-b border-[rgba(87,87,87,0.27)]"
  >
    <div class="flex gap-[7px] text-[14px]">
      <span>{{ index + 1 }}</span>
      <span>-</span>
      <span>{{ playerVotes.username }}</span>
    </div>
    <div class="flex justify-between text-[14px]">
      <span>{{ playerVotes.votes }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RankingVotes } from '@/types/Firestore/Bets'

type RankingType = {
  playerVotes: RankingVotes
  index: number
}

defineProps<RankingType>()
</script>
