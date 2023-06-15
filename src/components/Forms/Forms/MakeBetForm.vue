<template>
  <form
    class="flex flex-col"
    @submit.prevent="emit('submit')"
  >
    <div>
      <InputWithLabel
        v-model="modelValue.ask"
        label="Question"
        type="text"
        disabled
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-if="betStore.bet?.type === BetTypes.NUMBERS"
        v-model="modelValue.vote"
        label="Vote"
        type="number"
      />
      <SelectYesOrNot
        v-else-if="betStore.bet?.type === BetTypes.YESORNOT"
        v-model="modelValue.vote"
      />
      <SelectPlayers
        v-else
        v-model="modelValue.vote"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Ajouter</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { MakeBetForm } from '@/types/Forms/MakeBetForm'
import { useBetStore } from '@/store/betStore'
import { BetTypes } from '@/types/Firestore/Bets'
import SelectPlayers from '@/components/Forms/Inputs/SelectPlayers.vue'
import SelectYesOrNot from '@/components/Forms/Inputs/SelectYesOrNot.vue'

const betStore = useBetStore()
const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: MakeBetForm
}>()
const modelValue = useVModel<MakeBetForm>(props, 'modelValue')
</script>

<style scoped></style>
