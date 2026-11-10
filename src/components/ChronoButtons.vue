<script setup>
import {
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@heroicons/vue/24/solid";
import { pause, start, stop } from "../store";

const props = defineProps({
  chrono: Object,
  iconClass: {
    type: String,
    default: "size-12 sm:size-14",
  },
});
</script>

<template>
  <div class="flex gap-2 sm:gap-3">
    <button
      v-if="chrono.state === 'initial' || chrono.state === 'paused'"
      @click.stop="start(chrono)"
    >
      <PlayCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button v-if="chrono.state === 'started'" @click.stop="pause(chrono)">
      <PauseCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      v-if="chrono.state !== 'initial'"
      :disabled="chrono.state !== 'paused'"
      @click.stop="stop(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <StopCircleIcon :class="[iconClass, 'link']" />
    </button>
  </div>
</template>
