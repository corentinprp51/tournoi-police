<template>
  <div class="flex flex-col mt-[15px] h-full">
    <span
      v-if="isFinalPhase"
      class="text-[12px] italic font-light"
    >
      {{ match.matchLabel }}
    </span>
    <div
      class="flex justify-between h-full items-center gap-[10px]"
      :class="isFinalPhase && 'mt-[5px]'"
    >
      <div class="flex flex-col gap-[8px] w-full text-[14px]">
        <div class="flex justify-between">
          <span>{{ match.homeName }}</span>
          <span>{{ match.homeScore }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ match.awayName }}</span>
          <span>{{ match.awayScore }}</span>
        </div>
      </div>
      <div class="flex h-full items-center">
        <div class="hr-line h-[50px] w-[1px] bg-[#252525] mr-[46px]"></div>
        <div class="mr-[46px]">
          <span v-if="matchIsEnded(match)">Fin du match</span>
          <span v-else-if="matchIsPlaying(match)">En cours</span>
          <span v-else>{{ match.startHour }}</span>
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
import { Match } from '@/types/Firestore/Match'
import Line from '@/components/Cards/Header/Line.vue'
import { useTournoi } from '@/composables/useTournoi'

type SimpleMatchType = {
  match: Match
  isLast: boolean
  isFinalPhase: boolean
}
defineProps<SimpleMatchType>()
const { matchIsEnded, matchIsPlaying } = useTournoi()
</script>
