<template>
  <div class="mt-[17px]">
    <BetsNavbar />
    <BetsCard
      title="Paris"
      subtitle="Les paris créés par les joueurs"
      :bets="bets"
      class="mt-[25px]"
    />
  </div>
</template>

<script setup lang="ts">
import BetsCard from '@/components/Cards/Bets/BetsCard.vue'
import { onMounted, ref, watch } from 'vue'
import { Bet, BetStatus } from '@/types/Firestore/Bets'
import { useBets } from '@/composables/useBets'
import BetsNavbar from '@/components/Layouts/BetsNavbar.vue'
import { useRoute } from 'vue-router'

const bets = ref<Array<Bet>>([])
const route = useRoute()
const { getBetsByStatus } = useBets()
onMounted(async () => {
  await getBets()
})

const getBets = async () => {
  const status: BetStatus =
    route.name === 'paris-en-cours'
      ? BetStatus.TO_BET
      : route.name === 'paris-vote-final'
      ? BetStatus.TO_FINAL_VOTE
      : BetStatus.ENDED
  bets.value = await getBetsByStatus(status)
}

watch(
  () => route.name,
  async () => {
    await getBets()
  }
)
</script>

<style scoped></style>
