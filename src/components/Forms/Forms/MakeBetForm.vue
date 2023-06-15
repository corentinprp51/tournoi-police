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
        disabled
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.vote"
        label="Vote"
        type="text"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Ajouter</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { MakeBetForm } from '@/types/Forms/MakeBetForm'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: MakeBetForm
}>()
const modelValue = useVModel<MakeBetForm>(props, 'modelValue')
</script>

<style scoped></style>
