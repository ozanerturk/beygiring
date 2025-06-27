<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="currentColor">
    <rect x="0" y="0" :width="size" :height="size" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size: number;
}>();
</script>
