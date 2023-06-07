<template>
  <div class="flex flex-col">
    <span class="text-[14px] font-semibold text-white">{{ title }}</span>
    <span
      v-if="subtitle"
      class="text-[12px] font-light text-white -mt-[4px]"
    >
      {{ subtitle }}
    </span>
    <Line class="mt-[7px]" />
  </div>
</template>

<script lang="ts" setup>
import Line from '@/components/Cards/Header/Line.vue'

type HeaderCardProps = {
  title: string
  subtitle?: string
}
defineProps<HeaderCardProps>()
</script>
