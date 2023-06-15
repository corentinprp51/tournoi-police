<template>
  <div class="h-[calc(100vh-50px-120px)] overflow-y-scroll">
    <MatchsNavbar class="mt-[20px]" />
    <div v-if="route.name === 'matchs-poules'">
      <MatchsCard
        class="mt-[20px]"
        title="Groupe A"
        subtitle="Les matchs disputés par le groupe A"
        :matchs="matchsGroupA"
        group-id="0"
      />
      <MatchsCard
        class="mt-[32px]"
        title="Groupe B"
        subtitle="Les matchs disputés par le groupe B"
        :matchs="matchsGroupB"
        group-id="1"
      />
    </div>
    <div v-else>
      <MatchsCard
        class="mt-[32px]"
        title="Phases finales"
        subtitle="Les phases finales"
        :matchs="finalMatchs"
        :final-phase="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MatchsCard from '@/components/Cards/Matchs/MatchsCard.vue'
import { onMounted } from 'vue'
import { useTournoi } from '@/composables/useTournoi'
import MatchsNavbar from '@/components/Layouts/MatchsNavbar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getMatchsByGroup, matchsGroupA, matchsGroupB, finalMatchs } =
  useTournoi()

onMounted(async () => {
  await getMatchsByGroup()
})
</script>

<style scoped></style>
