<template>
  <div
    class="p-3 text-[14px] rounded-lg bg-input-bg text-red-300 flex items-center gap-[8px]"
    role="alert"
  >
    <span class="font-medium text-red-500">
      <AlertIcon />
    </span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import AlertIcon from '@/components/Icons/AlertIcon.vue'
</script>

<style scoped></style>
