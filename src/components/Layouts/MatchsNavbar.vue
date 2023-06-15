<template>
  <div
    class="text-[16px] font-light flex gap-[20px] w-full bg-[#252525] p-3 rounded-[5px]"
  >
    <router-link
      to="/matchs/poules"
      active-class="border-b-white border-b"
    >
      Matchs de poules
    </router-link>
    <router-link
      to="/matchs/phase-finale"
      active-class="border-b-white border-b"
    >
      Phase finale
    </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
