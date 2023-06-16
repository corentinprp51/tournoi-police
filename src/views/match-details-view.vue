<template>
  <div
    v-if="!utilsStore.isLoading"
    class="flex flex-col"
  >
    <div
      class="header grid grid-cols-[2fr_1fr_2fr] mt-[30px] justify-items-center"
    >
      <span class="text-[20px] font-light text-white">
        {{ shortedTeamName(match.homeName) }}
      </span>
      <div class="flex flex-col justify-center items-center">
        <span class="text-[20px] font-normal">
          {{ match.homeScore }} : {{ match.awayScore }}
        </span>
        <div
          class="text-[#989898] font-light text-[12px] flex flex-col items-center"
        >
          <span>Terrain {{ match.field }}</span>
          <span v-if="matchIsEnded(match)">Fin du match</span>
          <span v-else-if="matchIsPlaying(match)">En cours</span>
          <span v-else>{{ match.startHour }}</span>
        </div>
      </div>
      <span class="text-[20px] font-light text-white">
        {{ shortedTeamName(match.awayName) }}
      </span>
    </div>
    <div v-if="isPlayerTeamGame">
      <div
        v-if="!matchIsEnded(match)"
        class="mt-[20px] px-[8px]"
      >
        <HeaderCard
          title="Statistiques"
          class="font-normal mb-[15px]"
        />
        <span class="text-[14px] text-[#989898] font-light italic">
          Les statistiques seront disponibles une fois le match terminé
        </span>
      </div>
      <div
        v-else
        class="mt-[20px]"
      >
        <RankingStatsCard
          title="Statistiques"
          :ranking="stats"
        />
        <div class="w-full flex justify-center">
          <ButtonGeneric
            v-if="!hasAlreadyStats"
            class="w-[calc(100%-16px)] mt-[40px]"
            @click="
              router.push({
                name: 'match-stats-add',
                params: { id: route.params.id }
              })
            "
          >
            Ajouter mes stats
          </ButtonGeneric>
          <ButtonGeneric
            v-else
            class="w-[calc(100%-16px)] mt-[40px]"
            @click="
              router.push({
                name: 'match-stats-edit',
                params: { id: route.params.id }
              })
            "
          >
            Modifier mes stats
          </ButtonGeneric>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useTournoi } from '@/composables/useTournoi'
import { useUtilsStore } from '@/store/utilsStore'
import HeaderCard from '@/components/Cards/Header/HeaderCard.vue'
import RankingStatsCard from '@/components/Cards/Ranking/RankingStatsCard.vue'
import { FirestoreStats } from '@/types/Firestore/Statistiques'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { useUserStore } from '@/store/userStore'

const route = useRoute()
const router = useRouter()
const utilsStore = useUtilsStore()
const userStore = useUserStore()
const { match, getMatch, matchIsEnded, matchIsPlaying, getStats } = useTournoi()
const stats = ref<Array<FirestoreStats>>([])
onMounted(async () => {
  const id = route.params.id as string
  await getMatch(id)
  if (matchIsEnded(match.value)) {
    stats.value = await getStats(id)
    if (playerCurrentStats.value) {
      userStore.setStats(playerCurrentStats.value)
    }
  }
})

const hasAlreadyStats = computed(() => !!playerCurrentStats.value)

const playerCurrentStats = computed(() =>
  stats.value.find((el) => el.userId === userStore.user?.id)
)
const shortedTeamName = (teamName: string) => {
  if (teamName && teamName.length > 12) {
    return teamName.slice(0, 12) + '.'
  }
  return teamName
}

const isPlayerTeamGame = computed((): boolean => {
  if (match.value.awayName && match.value.homeName) {
    return (
      match.value.homeName.includes('Fils de') ||
      match.value.awayName.includes('Fils de')
    )
  }
  return false
})
</script>
