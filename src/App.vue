<script setup>
import { ref } from "vue";
import { newChrono } from "./chrono";
import Chrono from "./components/Chrono.vue";

const chronos = ref([
  newChrono("Cible 1"),
  newChrono("Cible 2"),
  newChrono("Cible 3"),
  newChrono("Cible 4"),
]);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center bg-gray-100 p-2">multichrono</header>
    <div class="flex grow flex-col gap-1 bg-gray-100">
      <Chrono v-for="chrono in chronos" :key="chrono.id" :chrono="chrono" />
    </div>
  </div>
</template>
