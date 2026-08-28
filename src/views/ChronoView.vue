<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { chronos } from "../chronoStore.js";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Time from "../components/Time.vue";

const route = useRoute();

const chrono = computed(() => chronos.value[route.params.index]);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center gap-4 p-2">
      <RouterLink to="/">
        <ArrowLeftIcon class="size-6" />
      </RouterLink>
      {{ chrono?.label ?? "404" }}
    </header>
    <div class="grow bg-slate-900 p-6" v-if="chrono">
      <Time class="text-4xl" :chrono="chrono"></Time>
    </div>
  </div>
</template>
