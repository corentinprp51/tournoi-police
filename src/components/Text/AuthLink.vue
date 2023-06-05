<template>
  <router-link
    class="italic text-[14px]"
    :to="to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
defineProps<{ to: string }>()
</script>

<style scoped></style>
