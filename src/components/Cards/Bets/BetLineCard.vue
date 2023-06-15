<template>
  <div class="flex flex-col mt-[15px] h-full">
    <div class="flex justify-between h-full items-center gap-[10px]">
      <div class="flex flex-col gap-[8px] w-full text-[14px]">
        <span>{{ bet.ask }}</span>
      </div>
      <div class="flex h-full items-center">
        <div class="hr-line h-[28px] w-[1px] bg-[#252525] mr-[15px]"></div>
        <div class="mr-[15px] text-[12px] font-light">
          <span>{{ bet.status }}</span>
        </div>
      </div>
    </div>
    <Line
      v-if="!isLast"
      class="mt-[15px]"
    />
  </div>
</template>

<script lang="ts" setup>
import Line from '@/components/Cards/Header/Line.vue'
import { Bet } from '@/types/Firestore/Bets'

type BetLineType = {
  bet: Bet
  isLast: boolean
}
defineProps<BetLineType>()
</script>
