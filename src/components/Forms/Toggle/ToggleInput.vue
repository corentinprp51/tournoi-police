<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      v-model="modelValue"
      type="checkbox"
      value=""
      class="sr-only peer"
    />
    <div
      class="w-11 h-6 bg-input-bg peer-focus:outline-none peer-focus:ring-red-500 rounded-full peer bg-input-bg peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <span class="ml-3 text-[15px] text-white">
      <slot />
    </span>
  </label>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'

const props = defineProps<{
  modelValue: boolean
}>()
const modelValue = useVModel<boolean>(props, 'modelValue')
</script>
