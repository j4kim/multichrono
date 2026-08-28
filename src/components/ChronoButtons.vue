<script setup>
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/vue/24/solid";
import { pause, start } from "../chronoStore";

const props = defineProps({
  chrono: Object,
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
      @click.stop="start(chrono)"
    >
      <PlayCircleIcon :class="iconClass" />
    </button>
    <button v-if="chrono.state === 'started'" @click.stop="pause(chrono)">
      <PauseCircleIcon :class="iconClass" />
    </button>
  </div>
</template>
