<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { chronos } from "../store.js";
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center p-2">
      <RouterLink to="/">
        <ArrowLeftIcon class="size-6" />
      </RouterLink>
    </header>
    <div class="grow bg-slate-900 p-6">
      {{ $route.params.chronoId }}
    </div>
  </div>
</template>
