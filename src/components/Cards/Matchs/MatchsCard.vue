<template>
  <div class="w-full bg-[#161616] px-[8px] pt-[8px] rounded-[5px]">
    <HeaderCard
      :title="title"
      :subtitle="subtitle"
    />
    <div class="matchs">
      <SimpleMatchCard
        v-for="(match, index) in matchs"
        :key="index"
        :match="match"
        :is-last="index === matchs.length - 1"
        :is-final-phase="finalPhase"
        @click="
          router.push({ name: 'match-details', params: { id: match.gameId } })
        "
      />
    </div>
    <div
      class="ranking mt-[15px] flex items-center justify-center border-t border-[rgba(87,87,87,0.27)]"
    >
      <router-link
        :to="rankingLink"
        class="text-[14px] font-bold py-[15px] w-full text-center"
      >
        <span>Voir classement</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCard from '@/components/Cards/Header/HeaderCard.vue'
import { Match } from '@/types/Firestore/Match'
import SimpleMatchCard from '@/components/Cards/Matchs/SimpleMatchCard.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

type MatchsCardProps = {
  title: string
  subtitle?: string
  matchs: Array<Match>
  groupId?: string
  finalPhase?: boolean
}
const props = withDefaults(defineProps<MatchsCardProps>(), {
  finalPhase: false,
  subtitle: '',
  groupId: ''
})
const router = useRouter()
const rankingLink = computed(() => {
  return props.groupId ? `/classement/${props.groupId}` : `/classement/final`
})
</script>

<style scoped></style>
