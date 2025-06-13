<template>
  <div class="mt-[36px]">
    <!-- @ts-ignore -->
    <AddBetForm
      v-model="bet as any"
      @submit="handleAddBet"
    />
    <ErrorAlert
      v-if="errorForm"
      class="mt-[20px]"
    >
      {{ errorForm }}
    </ErrorAlert>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { addDoc } from 'firebase/firestore'
import { betsRef } from '@/firebase'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'
import ToastesService from '@/services/ToastesService'
import { useUtilsStore } from '@/store/utilsStore'
import AddBetForm from '@/components/Forms/Forms/AddBetForm.vue'
import { Bet, BetStatus, BetTypes } from '@/types/Firestore/Bets'
import ErrorAlert from '@/components/Alerts/ErrorAlert.vue'
import { isFuture } from 'date-fns'

const bet = reactive<Partial<Bet>>({
  endDate: '',
  ask: '',
  endHours: '',
  status: BetStatus.TO_BET,
  type: BetTypes.PLAYERS
})
const userStore = useUserStore()
const utilsStore = useUtilsStore()
const router = useRouter()
const errorForm = ref('')

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
  if (bet.endDate !== '' && formDateIsPast.value) {
    errorForm.value = `La date ne doit pas être inférieure à la date actuelle`
    return
  }
  utilsStore.setLoaderApp(true)
  await addDoc(betsRef, {
    ...bet,
    username: userStore.user?.username || '',
    userId: userStore.user?.id || '',
    isEnded: false
  })
  ToastesService.getInstance().success('Vous venez de créer un pari')
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
</script>

<style scoped></style>
