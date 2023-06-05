<template>
  <div class="mt-[30px]">
    <MainTitle class="mb-[45px] text-center">Tournoi Police</MainTitle>
    <LoginForm
      v-model="loginForm"
      @submit="loginUser"
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
import LoginForm from '@/components/Forms/Forms/LoginForm.vue'
import MainTitle from '@/components/Text/MainTitle.vue'
import { useAuth } from '@/composables/useAuth'
import ErrorAlert from '@/components/Alerts/ErrorAlert.vue'

const { errorForm, loginUser, loginForm } = useAuth()
</script>

<style scoped></style>
