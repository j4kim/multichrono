<script setup>
import { computed } from "vue";
import { getMs } from "../store";

const props = defineProps({
  chrono: Object,
});

const hourlyRate = computed(() =>
  isNaN(props.chrono.hourlyRate) ? 0 : props.chrono.hourlyRate,
);

const price = computed(() => {
  const ms = getMs(props.chrono);
  const hours = ms / 3600000;
  return Math.floor(hours * hourlyRate.value);
});
</script>

<template>
  <div
    v-if="hourlyRate"
    class="tabular-nums"
    :class="{
      'opacity-20': chrono.state !== 'paused',
    }"
  >
    CHF {{ price }}
  </div>
</template>
