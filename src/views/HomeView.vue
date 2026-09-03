<script setup>
import Chrono from "../components/Chrono.vue";
import { add, chronos } from "../store.js";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex flex-col">
    <header class="flex h-12 items-center justify-between gap-4 p-2 px-4">
      multichrono
      <div class="grow"></div>
      <PlusIcon
        class="size-6 cursor-pointer hover:text-cyan-500"
        @click="() => add()"
      />
      <RouterLink to="/settings">
        <Cog6ToothIcon class="size-6 hover:text-cyan-500" />
      </RouterLink>
    </header>
    <div class="flex grow flex-col gap-1">
      <Chrono v-for="(chrono, id) in chronos" :key="id" :chrono :id />
    </div>
  </div>
</template>
