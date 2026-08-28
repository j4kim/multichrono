<script setup>
defineProps({
  chrono: Object,
});
</script>

<template>
  <div
    :chrono="chrono"
    class="col-span-full grid h-full grow grid-cols-subgrid items-center bg-white p-2"
  >
    <div>{{ chrono.label }}</div>
    <div></div>
    <div>▶️</div>
  </div>
</template>
