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
      />
    </div>
    <div class="mt-[17px]">
      <ToggleInput v-model="showDate">Ajouter une date de fin</ToggleInput>
    </div>
    <div
      v-if="showDate"
      class="mt-[17px]"
    >
      <InputWithLabel
        v-model="modelValue.endDate"
        label="Date de fin"
        type="date"
      />
    </div>
    <div
      v-if="showDate"
      class="mt-[17px]"
    >
      <!--      <InputWithLabel-->
      <!--        v-model="modelValue.endHours"-->
      <!--        label="Heure de fin"-->
      <!--        type="text"-->
      <!--      />-->
      <SelectHours
        v-model="hoursForm"
        @change="setHours"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Ajouter</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { Bet } from '@/types/Firestore/Bets'
import ToggleInput from '@/components/Forms/Toggle/ToggleInput.vue'
import { reactive, ref, watch } from 'vue'
import SelectHours from '@/components/Forms/Inputs/SelectHours.vue'
import { Hours } from '@/types/Forms/Hours'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: Bet
}>()
const modelValue = useVModel<Bet>(props, 'modelValue')
const showDate = ref(false)
const hoursForm = reactive<Hours>({
  hours: '00',
  minutes: '00'
})

const setHours = () => {
  modelValue.value.endHours = `${hoursForm.hours}:${hoursForm.minutes}`
}
watch(
  () => showDate.value,
  () => {
    if (!showDate.value) {
      hoursForm.minutes = ''
      hoursForm.hours = ''
      modelValue.value.endHours = ''
      modelValue.value.endDate = ''
    }
  }
)
</script>

<style scoped></style>
