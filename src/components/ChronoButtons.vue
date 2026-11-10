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

const stateMachine = {
  initial: ["start"],
  started: ["pause"],
  paused: ["stop", "start"],
};

function allow(action) {
  const allowed = stateMachine[props.chrono.state];
  return allowed.includes(action);
}
</script>

<template>
  <div class="flex gap-2 sm:gap-3">
    <button
      :disabled="!allow('start')"
      @click.stop="start(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <PlayCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      :disabled="!allow('pause')"
      @click.stop="pause(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <PauseCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      :disabled="!allow('stop')"
      @click.stop="stop(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <StopCircleIcon :class="[iconClass, 'link']" />
    </button>
  </div>
</template>
