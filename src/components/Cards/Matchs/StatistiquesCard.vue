<template>
  <div class="w-full bg-[#161616] px-[8px] pt-[8px] rounded-[5px]">
    <HeaderCard
      :title="title"
      :subtitle="subtitle"
    />
    <div class="stats">
      <SimpleStatsCard :stats="stats" />
    </div>
    <div
      class="ranking mt-[10px] flex items-center justify-center border-t border-[rgba(87,87,87,0.27)]"
    >
      <router-link
        to="/classement/statistiques"
        class="text-[14px] font-bold py-[15px] w-full text-center"
      >
        <span>Voir classement</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from '@/components/Cards/Header/HeaderCard.vue'
import { Statistiques } from '@/types/Firestore/Statistiques'
import SimpleStatsCard from '@/components/Cards/Matchs/SimpleStatsCard.vue'

type StatsCardProps = {
  title: string
  subtitle?: string
  stats: Statistiques
}
defineProps<StatsCardProps>()
</script>

<style scoped></style>
