<template>
  <form
    class="flex flex-col"
    @submit.prevent="emit('submit')"
  >
    <div>
      <InputWithLabel
        v-model="modelValue.email"
        label="Email"
        type="email"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.username"
        label="Prénom du joueur(se) / Visiteur(se)"
        type="text"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.password"
        label="Mot de passe"
        type="password"
      />
    </div>
    <div class="mt-[17px]">
      <InputWithLabel
        v-model="modelValue.confirm_password"
        label="Confirmation du mot de passe"
        type="password"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Inscription</ButtonGeneric>
  </form>
  <div class="flex w-full justify-center mt-[26px]">
    <AuthLink to="/login">
      Déjà un compte ? Connecte-toi en cliquant ici
    </AuthLink>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import AuthLink from '@/components/Text/AuthLink.vue'
import { RegisterForm } from '@/types/Forms/RegisterForm'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: RegisterForm
}>()
const modelValue = useVModel<RegisterForm>(props, 'modelValue')
</script>

<style scoped></style>
