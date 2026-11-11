<script setup>
import { chronos, getBgClass, resetIds, stop } from "../store.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";
import Price from "./Price.vue";
import { computed, useTemplateRef } from "vue";
import { useSwipe } from "@vueuse/core";

const props = defineProps({
  id: String,
});

const chrono = computed(() => chronos.value[props.id]);

const el = useTemplateRef("el");

const { lengthX } = useSwipe(el, {
  onSwipeEnd() {
    if (
      lengthX.value > 200 &&
      props.chrono.state !== "initial" &&
      confirm("Terminer ?")
    ) {
      stop(props.chrono);
    }
  },
});
</script>

<template>
  <div
    v-if="chrono"
    ref="el"
    class="flex min-h-32 grow flex-wrap items-center justify-between px-6 py-3 sm:min-h-40"
    :class="getBgClass(chrono)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
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
