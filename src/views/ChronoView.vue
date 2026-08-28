<script setup>
import { ArrowLeftIcon, StopIcon } from "@heroicons/vue/24/solid";
import { chronos, getBgClass, getColorClass, stop } from "../chronoStore.js";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Time from "../components/Time.vue";
import ChronoButtons from "../components/ChronoButtons.vue";

const route = useRoute();

const chrono = computed(() => chronos.value[route.params.index]);
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center gap-4 p-2">
      <RouterLink to="/">
        <ArrowLeftIcon class="size-6" />
      </RouterLink>
      {{ chrono?.label ?? "404" }}
    </header>
    <div
      v-if="chrono"
      class="flex grow flex-col gap-12 p-6"
      :class="getBgClass(chrono)"
    >
      <div class="flex gap-2">
        <div class="flex grow flex-col gap-2">
          <Time class="text-6xl" :chrono="chrono"></Time>
          <div v-if="chrono.state === 'initial'">Non démarré</div>
          <div v-if="chrono.state === 'started'">En cours</div>
          <div v-if="chrono.state === 'paused'">En pause</div>
        </div>
        <ChronoButtons
          :chrono
          :index="route.params.index"
          iconClass="size-16"
        />
      </div>

      <div class="flex justify-end">
        <div>
          <button
            class="flex h-14 items-center gap-2 rounded-full bg-white px-6 pl-3 text-xl disabled:opacity-50"
            :class="getColorClass(chrono)"
            :disabled="chrono.state !== 'paused'"
            @click="stop(route.params.index)"
          >
            <StopIcon class="inline size-9" />
            Terminer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
