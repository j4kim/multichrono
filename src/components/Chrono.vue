<script setup>
import { start, pause } from "../store";
import Time from "./Time.vue";

defineProps({
  chrono: Object,
  index: Number,
});
</script>

<template>
  <div :chrono="chrono" class="max-h-1/4 min-h-20 grow bg-white p-2">
    {{ chrono.label }}
    <Time :chrono="chrono"></Time>
    <button
      v-if="chrono.state === 'initial' || chrono.state === 'paused'"
      @click="start(index)"
    >
      ▶️
    </button>
    <button v-if="chrono.state === 'started'" @click="pause(index)">⏸️</button>
  </div>
</template>
