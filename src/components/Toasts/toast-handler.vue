<template>
  <transition-group
    name="fade"
    tag="div"
    class="absolute top-0 left-1/2 w-full -translate-x-1/2"
  >
    <component
      :is="toastMessage.component"
      v-for="(toastMessage, index) in toastsMessages"
      :key="index"
      :message="toastMessage.message"
      :style="`top: ${index * 50}px`"
      class="overflow-hidden"
      @close-toast="closeToast(index)"
    />
  </transition-group>
</template>

<script lang="ts" setup>
import ToastesService from '@/services/ToastesService'

const toastsMessages = ToastesService.getInstance().components
const closeToast = (index: number) => {
  console.log('close', index)
  toastsMessages.value.splice(index, 1)
  console.log(toastsMessages.value)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
