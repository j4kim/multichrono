<script setup>
import { computed } from "vue";
import { clock } from "../store";

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
    return props.chrono.offset + clock.value - props.chrono.started_at;
  } else if (props.chrono.state === "paused") {
    return props.chrono.offset;
  }
  return 0;
});

const time = computed(() => formatTime(ms.value));
</script>

<template>
  <div>{{ time }}</div>
</template>
