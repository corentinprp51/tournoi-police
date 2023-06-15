<template>
  <div
    class="text-[16px] font-light flex gap-[20px] w-full bg-[#252525] p-3 rounded-[5px]"
  >
    <router-link
      to="/paris/en-cours"
      active-class="border-b-white border-b"
    >
      En cours
    </router-link>
    <router-link
      to="/paris/vote-final"
      active-class="border-b-white border-b"
    >
      Vote final
    </router-link>
    <router-link
      to="/paris/termines"
      active-class="border-b-white border-b"
    >
      Terminés
    </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
