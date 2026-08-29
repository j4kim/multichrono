<script setup>
import { ArrowLeftIcon, ClockIcon, StopIcon } from "@heroicons/vue/24/solid";
import { chronos, getBgClass, getColorClass, stop } from "../chronoStore.js";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Time from "../components/Time.vue";
import ChronoButtons from "../components/ChronoButtons.vue";
import Price from "../components/Price.vue";

const route = useRoute();

const chrono = computed(() => chronos.value[route.params.index]);

function update() {
  const minutes = prompt("Minutes");
  if (minutes === null || minutes === "" || isNaN(minutes) || minutes < 0) {
    return;
  }
  const ms = +minutes * 60000;
  chrono.value.started_at = Date.now();
  chrono.value.offset = ms;
}
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center gap-4 p-2 px-4">
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
          <Time class="text-5xl" :chrono="chrono"></Time>
          <div class="flex gap-2">
            <div v-if="chrono.state === 'initial'">Non démarré</div>
            <div v-else-if="chrono.state === 'started'">En cours</div>
            <div v-else-if="chrono.state === 'paused'">En pause</div>
          </div>
        </div>
        <ChronoButtons :chrono iconClass="size-16" />
      </div>

      <Price :chrono class="text-5xl font-bold" />

      <div class="flex justify-end">
        <div>
          <button
            class="flex h-14 items-center gap-2 rounded-full bg-white px-6 pl-3 text-xl disabled:opacity-50"
            :class="getColorClass(chrono)"
            :disabled="chrono.state !== 'paused'"
            @click="stop(chrono)"
          >
            <StopIcon class="inline size-9" />
            Terminer
          </button>
        </div>
      </div>

      <hr />

      <label class="block">
        Nom
        <input
          v-model="chrono.label"
          class="mt-1 w-full border-white/20 bg-transparent focus:bg-black/5 focus:ring-0"
        />
      </label>

      <label class="block">
        Tarif horaire
        <input
          v-model="chrono.hourlyRate"
          class="mt-1 w-full border-white/20 bg-transparent focus:bg-black/5 focus:ring-0"
          type="number"
        />
      </label>

      <div>
        <button
          class="flex items-center gap-1 rounded-full bg-white py-1 pr-4 pl-2"
          :class="getColorClass(chrono)"
          @click="update"
        >
          <ClockIcon class="inline size-5" />
          Modifier manuellement
        </button>
      </div>
    </div>
  </div>
</template>
