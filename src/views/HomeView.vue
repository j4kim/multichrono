<script setup>
import Chrono from "../components/Chrono.vue";
import { chronos } from "../chronoStore.js";
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center p-2 px-4">multichrono</header>
    <div class="flex grow flex-col gap-1">
      <Chrono
        v-for="(chrono, index) in chronos"
        :key="chrono.id"
        :chrono
        :index
      />
    </div>
  </div>
</template>
