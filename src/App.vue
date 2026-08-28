<script setup>
import { ref } from "vue";
import { newChrono } from "./chrono";

const chronos = ref([
  newChrono("Cible 1"),
  newChrono("Cible 2"),
  newChrono("Cible 3"),
  newChrono("Cible 4"),
]);
</script>

<template>
  <div class="flex min-h-dvh flex-col gap-1 bg-gray-200">
    <div
      v-for="chrono in chronos"
      :key="chrono.id"
      class="max-h-[25dvh] min-h-20 grow bg-white"
    >
      {{ chrono.label }} ({{ chrono.id }})
    </div>
  </div>
</template>
