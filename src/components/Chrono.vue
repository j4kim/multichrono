<script setup>
import { computed } from "vue";
import { start, pause, stop } from "../chronoStore.js";
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
    class="flex max-h-1/4 min-h-20 grow items-center justify-between p-6"
    :class="bgClass"
    @click="$router.push(`/${chrono.id}`)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
      </div>
      <Time
        class="text-4xl"
        :chrono="chrono"
        :class="{
          'opacity-20': chrono.state === 'initial',
        }"
      ></Time>
    </div>
    <div class="flex gap-2">
      <button
        v-if="chrono.state === 'initial' || chrono.state === 'paused'"
        @click.stop="start(index)"
      >
        <PlayCircleIcon class="size-12" />
      </button>
      <button v-if="chrono.state === 'started'" @click.stop="pause(index)">
        <PauseCircleIcon class="size-12" />
      </button>
      <button v-if="chrono.state === 'paused'" @click.stop="stop(index)">
        <StopCircleIcon class="size-12" />
      </button>
    </div>
  </div>
</template>
