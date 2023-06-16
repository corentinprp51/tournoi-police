<template>
  <div class="mt-[36px]">
    <ProfileForm
      v-model="profileForm"
      @submit="updateUser"
    />
    <div
      v-if="userStore.user?.isAdmin"
      class="mt-[30px]"
    >
      <AdminDashboard />
    </div>
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
import AdminDashboard from '@/components/Admin/AdminDashboard.vue'

const userStore = useUserStore()
const showModal = computed(() => userStore.needLogout)
const { profileForm, updateUser, logoutUser } = useAuth()
</script>

<style scoped></style>
