<script setup>
import Chrono from "./components/Chrono.vue";
import { chronos } from "./store.js";
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center bg-slate-950 p-2">multichrono</header>
    <div class="flex grow flex-col gap-1 bg-slate-950">
      <Chrono
        v-for="(chrono, index) in chronos"
        :key="chrono.id"
        :chrono="chrono"
        :index="index"
      />
    </div>
  </div>
</template>
