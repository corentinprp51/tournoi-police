<template>
  <div
    v-if="isReady"
    class="mt-[36px]"
  >
    <EditBetForm
      v-model="bet"
      @submit="handleAddBet"
    />
    <ErrorAlert
      v-if="errorForm"
      class="mt-[20px]"
    >
      {{ errorForm }}
    </ErrorAlert>
  </div>
  <ModalRemoveBet
    v-if="showModal"
    @confirm="deleteBet"
    @cancel="betStore.setNeedRemove(false)"
  />
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRoute, useRouter } from 'vue-router'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'
import { Bet, BetStatus } from '@/types/Firestore/Bets'
import ErrorAlert from '@/components/Alerts/ErrorAlert.vue'
import { isFuture } from 'date-fns'
import { useBetStore } from '@/store/betStore'
import EditBetForm from '@/components/Forms/Forms/EditBetForm.vue'
import { useBets } from '@/composables/useBets'
import ModalRemoveBet from '@/components/Modals/ModalRemoveBet.vue'

const isReady = ref(false)
const utilsStore = useUtilsStore()
const betStore = useBetStore()
const { getBet } = useBets()
const router = useRouter()
const route = useRoute()
const errorForm = ref('')
const bet = reactive<Partial<Bet>>({
  endDate: betStore.bet?.endDate || '',
  ask: betStore.bet?.ask || '',
  endHours: betStore.bet?.endHours || '',
  status: betStore.bet?.status || BetStatus.TO_BET
})

onMounted(async () => {
  if (!betStore.bet) {
    const betFromApi = await getBet(route.params.betId as string)
    betStore.setBet(betFromApi)
    bet.endDate = betFromApi.endDate || ''
    bet.ask = betFromApi.ask || ''
    bet.endHours = betFromApi.endHours || ''
    bet.status = betFromApi.status || BetStatus.TO_BET
  }
  isReady.value = true
})
const handleAddBet = async () => {
  errorForm.value = ''
  if (!bet.ask) {
    errorForm.value = `Vous devez saisir la question du pari`
    return
  }
  if (
    (bet.endHours !== '' && bet.endDate === '') ||
    (bet.endHours === '' && bet.endDate !== '')
  ) {
    errorForm.value = `La date et l'heure doivent être saisies`
    return
  }
  if (
    bet.status !== BetStatus.ENDED &&
    bet.endDate !== '' &&
    formDateIsPast.value
  ) {
    errorForm.value = `La date ne doit pas être inférieure à la date actuelle`
    return
  }
  utilsStore.setLoaderApp(true)
  const docBetRef = doc(db, 'bets', betStore.bet?.id || '')
  await updateDoc(docBetRef, bet)
  ToastesService.getInstance().success('Vous venez de modifier un pari')
  await router.go(-1)
  utilsStore.setLoaderApp(false)
}

const formDateIsPast = computed((): boolean => {
  if (
    (bet.endHours?.split(':') || []).length === 2 &&
    bet.endDate &&
    bet.endHours
  ) {
    const dateForm = new Date(bet.endDate)
    const hours = parseInt(bet.endHours.split(':')[0])
    const minutes = parseInt(bet.endHours.split(':')[1])
    dateForm.setHours(hours, minutes, 0, 0)
    return !isFuture(dateForm)
  }
  return true
})

const showModal = computed(() => betStore.needRemove)

const deleteBet = async () => {
  utilsStore.setLoaderApp(true)
  const docBetRef = doc(db, 'bets', betStore.bet?.id || '')
  await deleteDoc(docBetRef)
  ToastesService.getInstance().success('Pari supprimé')
  await router.push({ name: 'paris' })
  utilsStore.setLoaderApp(false)
}
</script>

<style scoped></style>
