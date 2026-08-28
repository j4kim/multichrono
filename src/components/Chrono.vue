<script setup>
import { start } from "../store";
import Time from "./Time.vue";

defineProps({
  chrono: Object,
  index: Number,
});
</script>

<template>
  <div :chrono="chrono" class="max-h-1/4 min-h-20 grow bg-white p-2">
    {{ chrono.label }}
    <button v-if="chrono.state === 'initial'" @click="start(index)">▶️</button>
    <Time v-if="chrono.state === 'started'" :chrono="chrono"></Time>
  </div>
</template>
