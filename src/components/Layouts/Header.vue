<template>
  <div class="w-full h-[50px] bg-[#252525] px-[10px]">
    <div
      v-if="isOnHomePage"
      class="flex justify-between items-center h-full"
    >
      <div class="text-[20px]">
        <span>Bienvenue,</span>
        <span class="font-bold">&nbsp;{{ getUsername }}</span>
      </div>
      <router-link to="/profile"><UserIcon /></router-link>
    </div>
    <div
      v-else
      class="flex items-center h-full justify-between"
    >
      <BackIcon @click="backRoute" />
      <LogoutIcon
        v-if="isOnProfilePage"
        @click="handleLogoutUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from '@/Icons/UserIcon.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BackIcon from '@/Icons/BackIcon.vue'
import LogoutIcon from '@/Icons/LogoutIcon.vue'
import { useUserStore } from '@/store/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isOnHomePage = computed(() => route.name === 'home')
const isOnProfilePage = computed(() => route.name === 'profile')
const getUsername = computed(() => userStore.user?.username || '')
const handleLogoutUser = () => {
  userStore.setNeedLogout(true)
}
const backRoute = () => {
  router.back()
}
</script>

<style scoped></style>
