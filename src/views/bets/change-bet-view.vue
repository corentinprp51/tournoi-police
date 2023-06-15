<template>
  <form
    class="mt-4 flex w-full flex-col"
    @submit.prevent="handleChangeVote"
  >
    <InputWithLabel
      v-model="vote"
      :label="label"
    />
    <ButtonGeneric
      class="mt-[15px]"
      type="submit"
    >
      Modifier
    </ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import { computed, onMounted, ref } from 'vue'
import { useBetStore } from '@/store/betStore'
import { useUserStore } from '@/store/userStore'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { getUserBet, getUserVote } from '@/firebase'
import { updateDoc } from 'firebase/firestore'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'
import { useBets } from '@/composables/useBets'

const route = useRoute()
const router = useRouter()
const label = computed(() =>
  route.params.typeId === 'bet' ? 'Modifier mon pari' : 'Modifier mon vote'
)
const betStore = useBetStore()
const userStore = useUserStore()
const { setLoaderApp } = useUtilsStore()
const { getBet } = useBets()
const vote = ref('')

onMounted(async () => {
  if (!betStore.bet) {
    const bet = await getBet(route.params.betId as string)
    betStore.setBet(bet)
  }
  const userVote =
    route.params.typeId === 'bet'
      ? betStore.bet?.bets?.find((bet) => bet.userId === userStore.user?.id)
      : betStore.bet?.votes?.find((vote) => vote.userId === userStore.user?.id)
  vote.value = userVote?.vote || ''
})
const handleChangeVote = async () => {
  setLoaderApp(true)
  const userBetRef =
    route.params.typeId === 'bet'
      ? await getUserBet(betStore.bet?.id || '', userStore.user?.id || '')
      : await getUserVote(betStore.bet?.id || '', userStore.user?.id || '')
  console.log(userBetRef)
  await updateDoc(userBetRef, {
    vote: vote.value
  })
  ToastesService.getInstance().success(
    `${route.params.typeId === 'vote' ? 'Vote' : 'Pari'} enregistré`
  )
  await router.go(-1)
  setLoaderApp(false)
}
</script>

<style scoped></style>
