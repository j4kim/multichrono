<script setup>
import { computed } from "vue";
import { getMs } from "../chronoStore";

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

const time = computed(() => formatTime(getMs(props.chrono)));
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
