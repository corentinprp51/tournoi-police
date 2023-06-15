<template>
  <div>
    <div><span class="font-bold text-[16px] mb-[4px]">Joueurs</span></div>
    <div class="flex justify-between items-center gap-[10px]">
      <SelectGeneric
        v-model="modelValue"
        :options="playersOptions"
        @change="emit('change')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelectGeneric from '@/components/Forms/Inputs/Select-Generic.vue'
import { useVModel } from '@/composables/useVModel'
import { onMounted, ref } from 'vue'
import { Option } from '@/types/Forms/Option'
import { getAllPlayers } from '@/firebase'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'change'): void
  (e: 'update:modelValue'): void
}>()
const modelValue = useVModel<string>(props, 'modelValue')
const playersOptions = ref<Array<Option>>([])

const generatePlayers = async () => {
  const users = await getAllPlayers()
  playersOptions.value = users.map((u) => ({
    label: u.username,
    value: u.username
  }))
}

onMounted(() => {
  generatePlayers()
})
</script>

<style scoped></style>
