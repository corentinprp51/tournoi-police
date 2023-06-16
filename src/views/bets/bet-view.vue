<template>
  <div
    v-if="componentIsLoaded"
    class="mt-[9px]"
  >
    <div
      v-if="isBetStatuts"
      class="bet"
    >
      <div
        v-if="!hasBet"
        class="px-[15px]"
      >
        <MakeBetForm
          v-model="betForm"
          @submit="handleSubmitBet"
        />
      </div>
      <div v-else-if="hasBet">
        <RankingBetsCard
          title="Paris actuels"
          :ranking="rankingBets"
        />
      </div>
    </div>
    <div
      v-if="isVoteStatuts"
      class="final_vote"
    >
      <div
        v-if="!hasVote"
        class="px-[15px]"
      >
        <MakeBetForm
          v-model="betForm"
          @submit="handleSubmitBet(true)"
        />
      </div>
      <div v-else>
        <RankingBetsCard
          title="Votes actuels"
          :ranking="rankingFinalVotes"
        />
      </div>
    </div>
    <div
      v-if="isEndedStatuts"
      class="vote_results"
    >
      <RankingBetsCard
        title="Votes finaux"
        :ranking="rankingFinalVotes"
      />
    </div>
    <div
      v-if="hasVote || hasBet"
      class="fixed bottom-[120px] bg-input-bg w-full p-3 flex flex-col items-center justify-center"
    >
      <div class="flex justify-center gap-[5px]">
        {{ isBetStatuts || isEndedStatuts ? 'Pari' : 'Vote' }} actuel:
        <span class="font-semibold">
          <span :class="voteWonClass">
            {{ isBetStatuts || isEndedStatuts ? getMyBet : getMyVote }}
          </span>
        </span>
      </div>
      <div
        v-if="
          (hasBet && bet.status === BetStatus.TO_BET) ||
          (hasVote && bet.status === BetStatus.TO_FINAL_VOTE)
        "
        class="mt-[10px] w-full"
      >
        <ButtonGeneric
          class="w-full"
          @click="handleChangeBet"
        >
          Modifier mon {{ isBetStatuts || isEndedStatuts ? 'pari' : 'vote' }}
        </ButtonGeneric>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import { Bet, BetStatus, BetTypes, RankingVotes } from '@/types/Firestore/Bets'
import { MakeBetForm as MakeBetFormType } from '@/types/Forms/MakeBetForm'
import { useBets } from '@/composables/useBets'
import MakeBetForm from '@/components/Forms/Forms/MakeBetForm.vue'
import { betsFinalVotesRef, betsVotesRef, getAllUsers } from '@/firebase'
import { addDoc } from 'firebase/firestore'
import ToastesService from '@/services/ToastesService'
import { useUserStore } from '@/store/userStore'
import { useUtilsStore } from '@/store/utilsStore'
import { useBetStore } from '@/store/betStore'
import RankingBetsCard from '@/components/Cards/Ranking/RankingBetsCard.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { User } from '@/types/Firestore/User'

const bet = ref<Bet>({} as unknown as Bet)
const users = ref<Array<User>>([])
const betStore = useBetStore()
const betForm = reactive<MakeBetFormType>({
  ask: '',
  vote: ''
})
const { getBet } = useBets()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { setLoaderApp } = useUtilsStore()
const componentIsLoaded = ref(false)
onMounted(async () => {
  bet.value = await getBet(route.params.betId as string)
  betStore.setBet(bet.value)
  users.value = await getAllUsers()
  componentIsLoaded.value = true
  betForm.ask = bet.value.ask
})

const hasBet = computed(
  () => !!bet.value.bets?.find((bet) => bet.userId === userStore.user?.id)
)

const getMyBet = computed(
  () => bet.value.bets?.find((bet) => bet.userId === userStore.user?.id)?.vote
)

const getMyVote = computed(
  () =>
    bet.value.votes?.find((vote) => vote.userId === userStore.user?.id)?.vote
)

const voteWonClass = computed((): string => {
  if (bet.value.status === BetStatus.ENDED) {
    return rankingFinalVotes.value[0].username === getMyBet.value
      ? 'text-green-500'
      : 'text-red-500'
  }
  return ''
})

const hasVote = computed(
  () => !!bet.value.votes?.find((bet) => bet.userId === userStore.user?.id)
)

const isBetStatuts = computed(() => bet.value.status === BetStatus.TO_BET)
const isVoteStatuts = computed(
  () => bet.value.status === BetStatus.TO_FINAL_VOTE
)
const isEndedStatuts = computed(() => bet.value.status === BetStatus.ENDED)

const rankingBets = computed((): Array<RankingVotes> => {
  let finalArray: Array<RankingVotes> = []
  if (bet.value.type === BetTypes.PLAYERS) {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        bet.value.bets?.filter((el) => user.username === el.vote).length || 0
    }))
  } else if (bet.value.type === BetTypes.NUMBERS) {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        parseInt(
          bet.value.bets?.find((bet) => bet.username === user.username)?.vote ||
            '-999'
        ) || -999
    }))
  } else {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        bet.value.bets?.find((bet) => bet.username === user.username)?.vote ||
        ''
    }))
  }

  return bet.value.type === BetTypes.YESORNOT
    ? finalArray.filter((el) => el.votes).sort()
    : finalArray
        .filter((el) => (el.votes as number) > 0)
        .sort((a, b) => (b.votes as number) - (a.votes as number))
})

const rankingFinalVotes = computed((): Array<RankingVotes> => {
  let finalArray: Array<RankingVotes> = []
  if (bet.value.type === BetTypes.PLAYERS) {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        bet.value.votes?.filter((el) => user.username === el.vote).length ||
        (0 as number)
    }))
  } else if (bet.value.type === BetTypes.NUMBERS) {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        parseInt(
          bet.value.votes?.find((bet) => bet.username === user.username)
            ?.vote || '-999'
        ) || (-999 as number)
    }))
  } else {
    finalArray = users.value.map((user) => ({
      username: user.username,
      userId: user.id,
      votes:
        bet.value.votes?.find((bet) => bet.username === user.username)?.vote ||
        ''
    }))
  }

  return bet.value.type === BetTypes.YESORNOT
    ? finalArray.filter((el) => el.votes).sort()
    : finalArray
        .filter((el) => (el.votes as number) > 0)
        .sort((a, b) => (b.votes as number) - (a.votes as number))
})

const handleSubmitBet = async (isVoteStatus = false) => {
  setLoaderApp(true)
  const betsRef = !isVoteStatus
    ? betsVotesRef(route.params.betId as string)
    : betsFinalVotesRef(route.params.betId as string)
  await addDoc(betsRef, {
    username: userStore.user?.username || '',
    userId: userStore.user?.id || '',
    vote: betForm.vote
  })
  ToastesService.getInstance().success(
    `${isVoteStatus ? 'Vote' : 'Pari'} enregistré`
  )
  await router.go(-1)
  setLoaderApp(false)
}

const handleChangeBet = () => {
  const typeId = bet.value.status === BetStatus.TO_BET ? 'bet' : 'vote'
  router.push({ name: 'pari-change', params: { ...route.params, typeId } })
}
</script>

<style scoped></style>
