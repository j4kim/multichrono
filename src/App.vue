<script setup>
import { ref } from "vue";

const chronos = ref([]);

function addChrono() {
  chronos.value.push({
    id: Date.now(),
    label: chronos.value.length + 1,
  });
}
</script>

<template>
  <div class="flex min-h-dvh flex-col gap-1 bg-gray-200">
    <div
      v-for="chrono in chronos"
      :key="chrono.id"
      class="max-h-[25dvh] min-h-20 grow bg-white"
    >
      {{ chrono.label }}
    </div>
    <button
      @click="addChrono"
      class="max-h-[25dvh] min-h-20 grow bg-white text-5xl"
    >
      +
    </button>
  </div>
</template>
