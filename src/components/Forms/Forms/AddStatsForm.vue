<template>
  <form
    class="flex flex-col"
    @submit.prevent="emit('submit')"
  >
    <div>
      <InputWithLabel
        v-model="modelValue.goals"
        label="Buts"
        type="number"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.assists"
        label="Passes décisivies"
        type="number"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.nutmeg"
        label="Petits-ponts"
        type="number"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.goalkeeper"
        label="Arrêts / Sauvetages"
        type="number"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Ajouter</ButtonGeneric>
  </form>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import { Statistiques } from '@/types/Firestore/Statistiques'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: Statistiques
}>()
const modelValue = useVModel<Statistiques>(props, 'modelValue')
</script>

<style scoped></style>
