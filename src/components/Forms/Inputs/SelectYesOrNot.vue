<template>
  <div>
    <div><span class="font-bold text-[16px] mb-[4px]">Choix</span></div>
    <div class="flex justify-between items-center gap-[10px]">
      <SelectGeneric
        v-model="modelValue"
        :options="options"
        @change="emit('change')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectGeneric from '@/components/Forms/Inputs/Select-Generic.vue'
import { useVModel } from '@/composables/useVModel'
import { ref } from 'vue'
import { Option } from '@/types/Forms/Option'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'change'): void
  (e: 'update:modelValue'): void
}>()
const modelValue = useVModel<string>(props, 'modelValue')
const options = ref<Array<Option>>([
  {
    label: 'Oui',
    value: 'Oui'
  },
  {
    label: 'Non',
    value: 'Non'
  }
])
</script>

<style scoped></style>
