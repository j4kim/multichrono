<script setup></script>

<template>
  <div class="flex min-h-dvh flex-col gap-1 bg-gray-200">
    <div v-for="i in 4" :key="i" class="max-h-[25dvh] min-h-20 grow bg-white">
      {{ i }}
    </div>
  </div>
</template>
