<template>
  <div class="w-full h-[120px] fixed bottom-0">
    <nav class="h-[105px] w-full">
      <ul class="flex justify-around items-center h-full">
        <li>
          <router-link
            v-slot="{ isActive }"
            to="/"
            class="flex flex-col items-center justify-center"
          >
            <HomeIcon :active="isActive" />
            <span class="mt-[2px] text-[12px] font-light">Accueil</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="'/matchs/poules'"
            class="flex flex-col items-center justify-center"
          >
            <MatchIcon
              :active="isMatchActive"
              :class="isMatchActive && 'bg-white'"
            />
            <span class="mt-[2px] text-[12px] font-light">Matchs</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="'/paris/en-cours'"
            class="flex flex-col items-center justify-center"
          >
            <BetIcon :active="isBetActive" />
            <span class="mt-[2px] text-[12px] font-light">Paris</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import HomeIcon from '@/components/Icons/HomeIcon.vue'
import MatchIcon from '@/components/Icons/MatchIcon.vue'
import { useRoute } from 'vue-router'
import BetIcon from '@/components/Icons/BetIcon.vue'
import { computed } from 'vue'

const route = useRoute()
const isBetActive = computed(
  () =>
    route.name === 'paris-en-cours' ||
    route.name === 'paris-termines' ||
    route.name === 'paris-vote-final'
)
const isMatchActive = computed(
  () => route.name === 'matchs-poules' || route.name === 'matchs-phase-finale'
)
</script>

<style scoped></style>
