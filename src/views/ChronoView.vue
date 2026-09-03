<script setup>
import {
  ArrowLeftIcon,
  ClockIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import {
  chronos,
  confirmAndRemove,
  getBgClass,
  getColorClass,
  getStateString,
  stop,
} from "../store.js";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import Time from "../components/Time.vue";
import ChronoButtons from "../components/ChronoButtons.vue";
import Price from "../components/Price.vue";

const route = useRoute();
const router = useRouter();

const chrono = computed(() => chronos.value[route.params.id]);

function update() {
  const minutes = prompt("Minutes");
  if (minutes === null || minutes === "" || isNaN(minutes)) {
    return;
  }
  const ms = +minutes * 60000;
  chrono.value.started_at = Date.now();
  chrono.value.offset = ms;
}

function confirmAndRemoveAndGoHome() {
  if (confirmAndRemove(route.params.id)) {
    router.push("/");
  }
}
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center gap-4 p-2 px-4">
      <RouterLink to="/">
        <ArrowLeftIcon class="link size-6" />
      </RouterLink>
      {{ chrono ? chrono.label : 404 }}
    </header>

    <div
      v-if="chrono"
      class="flex grow flex-col gap-12 p-6"
      :class="getBgClass(chrono)"
    >
      <div class="flex gap-2">
        <div class="flex grow flex-col gap-2">
          <Time class="text-5xl" :chrono="chrono"></Time>
          <div>{{ getStateString(chrono) }}</div>
        </div>
        <ChronoButtons :chrono iconClass="size-16" />
      </div>

      <Price :chrono class="text-5xl font-bold" />

      <div class="flex justify-end">
        <div>
          <button
            class="btn h-14 px-6! pl-5! text-xl"
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
        <input v-model="chrono.label" class="input" />
      </label>

      <label class="block">
        Tarif horaire
        <input v-model="chrono.hourlyRate" class="input" type="number" />
      </label>

      <div>
        <button class="btn" :class="getColorClass(chrono)" @click="update">
          <ClockIcon class="-ml-2 inline size-5" />
          Modifier manuellement
        </button>
      </div>

      <div class="mb-12">
        <button
          class="btn bg-red-400! hover:bg-red-600! hover:text-black!"
          :class="getColorClass(chrono)"
          @click="confirmAndRemoveAndGoHome"
        >
          <XMarkIcon class="inline size-5" />
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
