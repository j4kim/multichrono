<script setup>
import Chrono from "../components/Chrono.vue";
import { chronos } from "../store.js";
import { Cog6ToothIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center justify-between p-2 px-4">
      multichrono
      <RouterLink to="/settings">
        <Cog6ToothIcon class="size-6" />
      </RouterLink>
    </header>
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
