<template>
  <div>
    <div
      v-for="radio in radios"
      :key="radio.value"
      class="flex items-center mb-4"
      @click="modelValue = radio.value"
    >
      <input
        id="default-radio"
        v-model="modelValue"
        :value="radio.value"
        type="radio"
        name="default-radio"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="default-radio"
        class="ml-2 text-[14px] font-medium text-gray-900 dark:text-gray-300"
      >
        {{ radio.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Option } from '@/types/Forms/Option'
import { useVModel } from '@/composables/useVModel'

type RadioProps = {
  radios: Array<Option>
  modelValue: string
}
const props = defineProps<RadioProps>()
const modelValue = useVModel<string>(props, 'modelValue')
</script>
