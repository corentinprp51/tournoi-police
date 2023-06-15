<template>
  <select
    id="countries"
    v-model="modelValue"
    class="border rounded-[5px] block text-[14px] w-full overflow-y-scroll py-[12px] min-h-[50px] pl-[4px] bg-input-bg border-white text-white dark:focus:ring-blue-600 dark:focus:border-blue-600 max-h-[100px]"
    v-bind="$attrs"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { Option } from '@/types/Forms/Option'
import { useVModel } from '@/composables/useVModel'

type SelectPropsType = {
  options: Array<Option>
  modelValue: string
}
const props = defineProps<SelectPropsType>()
const modelValue = useVModel<string>(props, 'modelValue')
</script>
