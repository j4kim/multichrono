<script setup>
import Chrono from "../components/Chrono.vue";
import { add, chronos } from "../store.js";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex flex-col">
    <header class="flex h-12 items-center justify-between gap-4 p-2 px-4">
      <a href="/" class="link">multichrono</a>
      <div class="grow"></div>
      <PlusIcon class="link size-6" @click="() => add()" />
      <RouterLink to="/settings">
        <Cog6ToothIcon class="link size-6" />
      </RouterLink>
    </header>
    <div class="flex grow flex-col gap-1">
      <Chrono v-for="(chrono, id) in chronos" :key="id" :chrono :id />
    </div>
  </div>
</template>
