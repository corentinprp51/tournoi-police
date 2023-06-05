<template>
  <div class="flex flex-col justify-center">
    <span class="font-bold text-[16px] mb-[4px]">{{ label }}</span>
    <InputGeneric
      v-model="modelValue"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts" setup>
import InputGeneric from '@/components/Forms/Inputs/Input-Generic.vue'

import { useVModel } from '@/composables/useVModel'

const props = defineProps<{ modelValue: string | number; label: string }>()
const modelValue = useVModel<string | number>(props, 'modelValue')
</script>

<style scoped></style>
