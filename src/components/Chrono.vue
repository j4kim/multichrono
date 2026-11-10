<script setup>
import { getBgClass, stop } from "../store.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";
import Price from "./Price.vue";
import { useTemplateRef } from "vue";
import { useSwipe } from "@vueuse/core";

const props = defineProps({
  chrono: Object,
  id: String,
});

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
    ref="el"
    :chrono="chrono"
    class="flex h-32 grow flex-wrap items-center justify-between px-6 py-1 sm:h-40"
    :class="getBgClass(chrono)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
      </div>
      <Time class="text-2xl sm:text-4xl" :chrono></Time>
      <Price class="text-2xl font-bold sm:text-3xl" :chrono></Price>
    </div>
    <ChronoButtons :chrono />
  </div>
</template>
