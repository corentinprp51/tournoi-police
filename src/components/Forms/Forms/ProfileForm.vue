<template>
  <form
    class="flex flex-col"
    @submit.prevent="emit('submit')"
  >
    <div>
      <InputWithLabel
        v-model="modelValue.username"
        label="Prénom"
        type="text"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Modifier</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { ProfileForm } from '@/types/Forms/ProfileForm'
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: ProfileForm
}>()
const modelValue = useVModel<ProfileForm>(props, 'modelValue')
</script>

<style scoped></style>
