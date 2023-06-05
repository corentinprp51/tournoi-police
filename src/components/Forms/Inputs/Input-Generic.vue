<template>
  <input
    v-bind="$attrs"
    v-model="modelValue"
    class="rounded-[5px] bg-input-bg border border-white focus:outline-none py-[12px] pl-[4px]"
  />
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'

const props = defineProps<{ modelValue: string | number }>()
const modelValue = useVModel<string | number>(props, 'modelValue')
</script>

<style scoped></style>
