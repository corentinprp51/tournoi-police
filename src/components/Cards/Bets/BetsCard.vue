<template>
  <div class="w-full bg-[#161616] px-[8px] pt-[8px] rounded-[5px]">
    <HeaderCard
      :title="title"
      :subtitle="subtitle"
    />
    <div class="bets">
      <BetLineCard
        v-for="(bet, index) in bets"
        :key="index"
        :bet="bet"
        :is-last="index === bets.length - 1"
        @click="router.push({ name: 'pari-view', params: { betId: bet.id } })"
      />
      <div
        v-if="bets.length === 0"
        class="text-[14px] italic mt-[15px] text-[#989898] font-light"
      >
        Aucun pari pour le moment
      </div>
    </div>
    <div
      class="ranking mt-[15px] flex items-center justify-center border-t border-[rgba(87,87,87,0.27)]"
    >
      <router-link
        :to="`/paris/nouveau`"
        class="text-[14px] font-bold py-[15px] w-full text-center"
      >
        <span>Créer un pari</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from '@/components/Cards/Header/HeaderCard.vue'
import { useRouter } from 'vue-router'
import { Bet } from '@/types/Firestore/Bets'
import BetLineCard from '@/components/Cards/Bets/BetLineCard.vue'

type BetsCardProps = {
  title: string
  subtitle?: string
  bets: Array<Bet>
}
defineProps<BetsCardProps>()
const router = useRouter()
</script>
