<script setup>
import { getBgClass } from "../store.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";
import Price from "./Price.vue";

const props = defineProps({
  chrono: Object,
  id: String,
});
</script>

<template>
  <div
    :chrono="chrono"
    class="flex min-h-32 grow flex-wrap items-center justify-between px-6 py-3 sm:min-h-40"
    :class="getBgClass(chrono)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
      </div>
      <Time class="text-2xl sm:text-4xl" :chrono></Time>
      <Price class="text-2xl font-bold sm:text-3xl" :chrono></Price>
    </div>
    <ChronoButtons :chrono :id />
  </div>
</template>
