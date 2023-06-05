<template>
  <div class="mt-[30px]">
    <MainTitle class="mb-[45px] text-center">Tournoi Police</MainTitle>
    <RegisterForm
      v-model="registerForm"
      @submit="registerUser"
    />
    <ErrorAlert
      v-if="errorForm"
      class="mt-[20px]"
    >
      {{ errorForm }}
    </ErrorAlert>
  </div>
</template>

<script lang="ts" setup>
import MainTitle from '@/components/Text/MainTitle.vue'
import RegisterForm from '@/components/Forms/Forms/RegisterForm.vue'
import { useAuth } from '@/composables/useAuth'
import ErrorAlert from '@/components/Alerts/ErrorAlert.vue'

const { errorForm, registerUser, registerForm } = useAuth()
</script>

<style scoped></style>
