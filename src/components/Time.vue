<script setup>
import { computed } from "vue";
import { clock } from "../chronoStore";

const props = defineProps({
  chrono: Object,
});

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
}

const ms = computed(() => {
  if (props.chrono.state === "started") {
    const elapsed = Math.max(0, clock.value - props.chrono.started_at);
    return props.chrono.offset + elapsed;
  } else if (props.chrono.state === "paused") {
    return props.chrono.offset;
  }
  return 0;
});

const time = computed(() => formatTime(ms.value));
</script>

<template>
  <div
    class="tabular-nums"
    :class="{
      'opacity-20': chrono.state === 'initial',
    }"
  >
    {{ time }}
  </div>
</template>
