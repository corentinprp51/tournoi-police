<template>
  <div class="mt-[36px]">
    <ProfileForm
      v-model="profileForm"
      @submit="updateUser"
    />
  </div>
  <ModalLogout
    v-if="showModal"
    @confirm="logoutUser"
    @cancel="userStore.setNeedLogout(false)"
  />
</template>

<script setup lang="ts">
import ProfileForm from '@/components/Forms/Forms/ProfileForm.vue'
import { useAuth } from '@/composables/useAuth'
import ModalLogout from '@/components/Modals/ModalLogout.vue'
import { computed } from 'vue'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
const showModal = computed(() => userStore.needLogout)
const { profileForm, updateUser, logoutUser } = useAuth()
</script>

<style scoped></style>
