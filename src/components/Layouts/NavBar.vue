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
            v-slot="{ isActive }"
            :to="'/matchs'"
            class="flex flex-col items-center justify-center"
          >
            <MatchIcon
              :active="isActive"
              :class="isActive && 'bg-white'"
            />
            <span class="mt-[2px] text-[12px] font-light">Matchs</span>
          </router-link>
        </li>
        <li>
          <router-link
            v-slot="{ isActive }"
            :to="'/paris'"
            class="flex flex-col items-center justify-center"
          >
            <BetIcon :active="isActive" />
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

const route = useRoute()
</script>

<style scoped></style>
