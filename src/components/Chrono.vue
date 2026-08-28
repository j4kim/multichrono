<script setup>
import { computed } from "vue";
import { start, pause, stop } from "../store";
import Time from "./Time.vue";

const props = defineProps({
  chrono: Object,
  index: Number,
});

const bgClass = computed(() => {
  return (
    {
      initial: "bg-slate-900",
      paused: "bg-slate-800",
      started: "bg-cyan-900",
    }[props.chrono.state] ?? "bg-red-700"
  );
});
</script>

<template>
  <div :chrono="chrono" class="max-h-1/4 min-h-20 grow p-2" :class="bgClass">
    {{ chrono.label }}
    <Time :chrono="chrono"></Time>
    <div class="flex gap-2">
      <button
        v-if="chrono.state === 'initial' || chrono.state === 'paused'"
        @click="start(index)"
      >
        ▶️
      </button>
      <button v-if="chrono.state === 'started'" @click="pause(index)">
        ⏸️
      </button>
      <button v-if="chrono.state === 'paused'" @click="stop(index)">⏹</button>
    </div>
  </div>
</template>
