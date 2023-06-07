<template>
  <div class="flex flex-col mt-[10px] h-full text-[14px]">
    <div
      class="flex justify-between border-b border-[rgba(87,87,87,0.27)] pb-[10px]"
    >
      <span>Buts</span>
      <span>{{ replaceIf0(stats.goals) }}</span>
    </div>
    <div
      class="flex justify-between border-b border-[rgba(87,87,87,0.27)] py-[10px]"
    >
      <span>Passes décisives</span>
      <span>{{ replaceIf0(stats.assists) }}</span>
    </div>
    <div
      class="flex justify-between border-b border-[rgba(87,87,87,0.27)] py-[10px]"
    >
      <span>Petits ponts</span>
      <span>{{ replaceIf0(stats.nutmeg) }}</span>
    </div>
    <div class="flex justify-between pt-[10px]">
      <span>Arrêts / Sauvetages</span>
      <span>{{ replaceIf0(stats.goalkeeper) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Statistiques } from '@/types/Firestore/Statistiques'
import { replaceIf0 } from '@/utils/replaceIf0'

type SimpleStatsType = {
  stats: Statistiques
}
defineProps<SimpleStatsType>()
</script>
