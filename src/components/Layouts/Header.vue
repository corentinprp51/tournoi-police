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
      <EditIcon
        v-if="isOnBetViewPage && isOwner(betStore.bet)"
        @click="router.push({ name: 'pari-edit', params: { ...route.params } })"
      />
      <RemoveIcon
        v-if="isOnBetEditPage"
        @click="handleRemoveBet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserIcon from '@/components/Icons/UserIcon.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BackIcon from '@/components/Icons/BackIcon.vue'
import LogoutIcon from '@/components/Icons/LogoutIcon.vue'
import { useUserStore } from '@/store/userStore'
import EditIcon from '@/components/Icons/EditIcon.vue'
import { useBetStore } from '@/store/betStore'
import { useBets } from '@/composables/useBets'
import RemoveIcon from '@/components/Icons/RemoveIcon.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const betStore = useBetStore()
const { isOwner } = useBets()
const isOnHomePage = computed(() => route.name === 'home')
const isOnProfilePage = computed(() => route.name === 'profile')
const isOnBetViewPage = computed(() => route.name === 'pari-view')
const isOnBetEditPage = computed(() => route.name === 'pari-edit')
const getUsername = computed(() => userStore.user?.username || '')
const handleLogoutUser = () => {
  userStore.setNeedLogout(true)
}

const handleRemoveBet = () => {
  betStore.setNeedRemove(true)
}
const backRoute = () => {
  router.back()
}
</script>

<style scoped></style>
