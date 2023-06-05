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
        v-model="modelValue.password"
        label="Mot de passe"
        type="password"
      />
    </div>
    <ButtonGeneric class="mt-[32px]">Connexion</ButtonGeneric>
  </form>
  <div class="flex w-full justify-center mt-[26px]">
    <AuthLink to="/register">
      Pas encore de compte ? Inscris-toi en cliquant ici
    </AuthLink>
  </div>
</template>

<script lang="ts" setup>
import { LoginForm } from '@/types/Forms/LoginForm'
import { useVModel } from '@/composables/useVModel'
import InputWithLabel from '@/components/Forms/Inputs/InputWithLabel.vue'
import ButtonGeneric from '@/components/Forms/Buttons/ButtonGeneric.vue'
import AuthLink from '@/components/Text/AuthLink.vue'

const emit = defineEmits<{
  (e: 'submit'): void
}>()
const props = defineProps<{
  modelValue: LoginForm
}>()
const modelValue = useVModel<LoginForm>(props, 'modelValue')
</script>

<style scoped></style>
