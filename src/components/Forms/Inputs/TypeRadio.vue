<template>
  <div class="mb-[10px]">
    <span class="font-semibold text-[16px]">Type de Pari</span>
  </div>
  <InputRadioGeneric
    v-model="modelValue"
    :radios="radios"
  />
</template>

<script lang="ts" setup>
import InputRadioGeneric from '@/components/Forms/Inputs/InputRadioGeneric.vue'
import { ref } from 'vue'
import { useVModel } from '@/composables/useVModel'
import { Option } from '@/types/Forms/Option'
import { BetTypes } from '@/types/Firestore/Bets'

type RadioProps = {
  modelValue: string
}
const props = defineProps<RadioProps>()
const modelValue = useVModel<string>(props, 'modelValue')

const radios = ref<Array<Option>>([
  {
    label: BetTypes.PLAYERS,
    value: BetTypes.PLAYERS
  },
  {
    label: BetTypes.YESORNOT,
    value: BetTypes.YESORNOT
  },
  {
    label: BetTypes.NUMBERS,
    value: BetTypes.NUMBERS
  }
])
</script>

<style scoped></style>
