<script setup>
import Chrono from "./components/Chrono.vue";
import { chronos } from "./store.js";
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center bg-gray-100 p-2">multichrono</header>
    <div class="flex grow flex-col gap-1 bg-gray-100">
      <Chrono
        v-for="(chrono, index) in chronos"
        :key="chrono.id"
        :chrono="chrono"
        :index="index"
      />
    </div>
  </div>
</template>
