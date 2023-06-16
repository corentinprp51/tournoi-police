<template>
  <div class="mb-[10px]">
    <span class="font-semibold text-[16px]">Type</span>
  </div>
  <InputRadioGeneric
    v-model="modelValue"
    class="flex items-center gap-[20px] text-[16px] w-full"
    :radios="radios"
  />
</template>

<script lang="ts" setup>
import InputRadioGeneric from '@/components/Forms/Inputs/InputRadioGeneric.vue'
import { ref } from 'vue'
import { useVModel } from '@/composables/useVModel'
import { Option } from '@/types/Forms/Option'

type RadioProps = {
  modelValue: string
}
const props = defineProps<RadioProps>()
const modelValue = useVModel<string>(props, 'modelValue')

const radios = ref<Array<Option>>([
  {
    label: 'Joueur',
    value: 'Joueur'
  },
  {
    label: 'Visiteur',
    value: 'Visiteur'
  }
])
</script>

<style scoped></style>
