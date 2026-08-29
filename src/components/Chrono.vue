<script setup>
import { getBgClass, stop } from "../chronoStore.js";
import Time from "./Time.vue";
import ChronoButtons from "./ChronoButtons.vue";
import Price from "./Price.vue";
import { useTemplateRef } from "vue";
import { useSwipe } from "@vueuse/core";

const props = defineProps({
  chrono: Object,
  index: Number,
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
    class="flex max-h-1/4 min-h-20 grow items-center justify-between px-6 py-1"
    :class="getBgClass(chrono)"
    @click="$router.push(`/chrono/${index}`)"
  >
    <div>
      <div class="text-xl font-light">
        {{ chrono.label }}
      </div>
      <Time class="text-4xl" :chrono></Time>
      <Price class="text-3xl font-bold" :chrono></Price>
    </div>
    <ChronoButtons :chrono />
  </div>
</template>
