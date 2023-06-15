<template>
  <div>
    <div><span class="font-bold text-[16px] mb-[4px]">Heure de fin</span></div>
    <div class="flex justify-between items-center gap-[10px]">
      <SelectGeneric
        v-model="modelValue.hours"
        :options="hoursOptions"
        @change="emit('change')"
      />
      <span>h</span>
      <SelectGeneric
        v-model="modelValue.minutes"
        :options="minutesOptions"
        @change="emit('change')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectGeneric from '@/components/Forms/Inputs/Select-Generic.vue'
import { useVModel } from '@/composables/useVModel'
import { Hours } from '@/types/Forms/Hours'
import { onMounted, ref } from 'vue'
import { Option } from '@/types/Forms/Option'

const props = defineProps<{
  modelValue: Hours
}>()
const emit = defineEmits<{
  (e: 'change'): void
}>()
const modelValue = useVModel<Hours>(props, 'modelValue')
const hoursOptions = ref<Array<Option>>([])
const minutesOptions = ref<Array<Option>>([])

onMounted(() => {
  generateHoursOptions()
  generateMinutesOption()
})
const generateHoursOptions = () => {
  for (let hour = 0; hour < 24; hour++) {
    hoursOptions.value.push({
      label:
        hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString(),
      value:
        hour.toString().length === 1 ? `0${hour.toString()}` : hour.toString()
    })
  }
}
const generateMinutesOption = () => {
  for (let minute = 0; minute < 60; minute += 5) {
    minutesOptions.value.push({
      label:
        minute.toString().length === 1
          ? `0${minute.toString()}`
          : minute.toString(),
      value:
        minute.toString().length === 1
          ? `0${minute.toString()}`
          : minute.toString()
    })
  }
}
</script>

<style scoped></style>
