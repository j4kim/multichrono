<script setup>
import { chronos, getBgClass, renameModal, resetIds } from "../store.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";
import Price from "./Price.vue";
import { computed, ref } from "vue";

const props = defineProps({
  id: String,
});

const chrono = computed(() => chronos.value[props.id]);

const lastLabelClick = ref(0);

function renameOnDblClick() {
  const now = Date.now();
  const delay = now - lastLabelClick.value;
  if (delay < 300 && delay > 0) {
    renameModal.value = chrono.value;
  } else {
    lastLabelClick.value = now;
  }
}
</script>

<template>
  <div
    v-if="chrono"
    class="flex min-h-32 grow flex-wrap items-center justify-between px-6 py-3 sm:min-h-40"
    :class="getBgClass(chrono)"
  >
    <div>
      <div
        class="touch-manipulation text-xl font-light"
        :class="{
          'opacity-20': !chrono.label,
        }"
        @click="renameOnDblClick"
      >
        {{ chrono.label || "sans nom" }}
      </div>
      <Time class="text-2xl sm:text-4xl" :chrono></Time>
      <Price class="text-2xl font-bold sm:text-3xl" :chrono></Price>
    </div>
    <ChronoButtons :chrono :id />
  </div>
  <div v-else>
    Chrono {{ id }} not found.
    <button class="btn" @click="resetIds">reset</button>
  </div>
</template>
