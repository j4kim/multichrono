<script setup>
defineProps({
  chrono: Object,
});
</script>

<template>
  <div :chrono="chrono" class="max-h-1/4 min-h-20 grow bg-white p-2">
    {{ chrono.label }}
    <button v-if="chrono.state === 'initial'" @click="run">▶️</button>
  </div>
</template>
