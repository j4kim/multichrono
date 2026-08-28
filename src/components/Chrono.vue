<script setup>
import { computed } from "vue";
import { start, pause, stop } from "../store";
import Time from "./Time.vue";
import {
  PauseCircleIcon,
  PauseIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@heroicons/vue/24/solid";

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
  <div
    :chrono="chrono"
    class="max-h-1/4 min-h-20 grow p-2 text-2xl"
    :class="bgClass"
  >
    {{ chrono.label }}
    <Time :chrono="chrono"></Time>
    <div class="flex gap-2">
      <button
        v-if="chrono.state === 'initial' || chrono.state === 'paused'"
        @click="start(index)"
      >
        <PlayCircleIcon class="size-8" />
      </button>
      <button v-if="chrono.state === 'started'" @click="pause(index)">
        <PauseCircleIcon class="size-8" />
      </button>
      <button v-if="chrono.state === 'paused'" @click="stop(index)">
        <StopCircleIcon class="size-8" />
      </button>
    </div>
  </div>
</template>
