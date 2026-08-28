<script setup>
import { computed } from "vue";
import { getMs } from "../chronoStore";

const props = defineProps({
  chrono: Object,
});

const price = computed(() => {
  const ms = getMs(props.chrono);
  const hours = ms / 3600000;
  const hourlyRate = 30;
  return Math.floor(hours * hourlyRate);
});
</script>

<template>
  <div
    class="tabular-nums"
    :class="{
      'opacity-20': chrono.state !== 'paused',
    }"
  >
    CHF {{ price }}
  </div>
</template>
