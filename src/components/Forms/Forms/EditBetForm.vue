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
        v-model="modelValue.endDate as string"
        label="Date de fin"
        type="date"
      />
    </div>
    <div
      v-if="showDate"
      class="mt-[17px]"
    >
      <SelectHours
        v-model="hoursForm"
        @change="setHours"
      />
    </div>
    <div class="mt-[17px]">
      <StatusRadio v-model="radioPicked" />
    </div>
    <ButtonGeneric class="mt-[32px]">Modifier</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { Bet } from '@/types/Firestore/Bets'
import ToggleInput from '@/components/Forms/Toggle/ToggleInput.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import SelectHours from '@/components/Forms/Inputs/SelectHours.vue'
import { Hours } from '@/types/Forms/Hours'
import StatusRadio from '@/components/Forms/Inputs/StatusRadio.vue'

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
const radioPicked = ref(modelValue.value.status)

onMounted(() => {
  if (modelValue.value.endDate && modelValue.value.endHours) {
    showDate.value = true
    hoursForm.hours = modelValue.value.endHours.split(':')[0]
    hoursForm.minutes = modelValue.value.endHours.split(':')[1]
  }
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
watch(
  () => radioPicked.value,
  () => {
    modelValue.value.status = radioPicked.value
  }
)
</script>

<style scoped></style>
