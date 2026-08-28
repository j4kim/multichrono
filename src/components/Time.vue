<script setup>
import { computed } from "vue";
import { clock } from "../store";

const props = defineProps({
  chrono: Object,
});

const time = computed(() => {
  const ms = clock.value - props.chrono.started_at;
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
});
</script>

<template>
  <div>{{ time }}</div>
</template>
