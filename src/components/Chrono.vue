<script setup>
import { getBgClass } from "../chronoStore.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";

const props = defineProps({
  chrono: Object,
  index: Number,
});
</script>

<template>
  <div
    :chrono="chrono"
    class="flex max-h-1/4 min-h-20 grow items-center justify-between p-6"
    :class="getBgClass(chrono)"
    @click="$router.push(`/${index}`)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
      </div>
      <Time class="text-4xl" :chrono></Time>
    </div>
    <ChronoButtons :chrono :index />
  </div>
</template>
