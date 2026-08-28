<script setup>
import {
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
} from "@heroicons/vue/24/solid";
import { pause, start, stop } from "../chronoStore";

const props = defineProps({
  chrono: Object,
  index: [String, Number],
  iconClass: {
    type: String,
    default: "size-12",
  },
});
</script>

<template>
  <div class="flex gap-2">
    <button
      v-if="chrono.state === 'initial' || chrono.state === 'paused'"
      @click.stop="start(index)"
    >
      <PlayCircleIcon :class="iconClass" />
    </button>
    <button v-if="chrono.state === 'started'" @click.stop="pause(index)">
      <PauseCircleIcon :class="iconClass" />
    </button>
    <button v-if="chrono.state === 'paused'" @click.stop="stop(index)">
      <StopCircleIcon :class="iconClass" />
    </button>
  </div>
</template>
