<template>
  <div>
    <div>
      <span class="font-semibold">Admin Dashboard</span>
    </div>
    <div class="mt-[10px]">
      <ButtonGeneric
        class="w-full"
        @click="showModal('bets')"
      >
        Reset Bets
      </ButtonGeneric>
      <ButtonGeneric
        class="w-full mt-[15px]"
        @click="showModal('stats')"
      >
        Reset Stats
      </ButtonGeneric>
    </div>
    <ModalReset
      v-if="showReset"
      @confirm="handleReset"
      @cancel="cancelReset"
    />
  </div>
</template>

<script setup lang="ts">
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { ref } from 'vue'
import ModalReset from '@/components/Modals/ModalReset.vue'
import { getDocs, writeBatch } from 'firebase/firestore'
import { db, getAllBets, statsRef } from '@/firebase'
import ToastesService from '@/services/ToastesService'

const showReset = ref(false)
const collectionType = ref('')
const showModal = (collection: string) => {
  showReset.value = true
  collectionType.value = collection
}

const handleReset = async () => {
  const batch = writeBatch(db)
  if (collectionType.value === 'bets') {
    const allBets = await getAllBets()
    allBets.forEach((bet) => batch.delete(bet.ref))
    ToastesService.getInstance().success('Paris supprimées')
  } else if (collectionType.value === 'stats') {
    const allStats = await getDocs(statsRef)
    allStats.forEach((stat) => batch.delete(stat.ref))
    ToastesService.getInstance().success('Stats supprimées')
  }
  await batch.commit()
  cancelReset()
}

const cancelReset = () => {
  showReset.value = false
  collectionType.value = ''
}
</script>

<style scoped></style>
