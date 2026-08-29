<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { settings } from "../settingsStore.js";
import { ref } from "vue";
import { chronos } from "../chronoStore.js";

const applying = ref(false);

function apply() {
  chronos.value.forEach(
    (chrono) => (chrono.hourlyRate = settings.value.hourlyRate),
  );
  applying.value = true;
  setTimeout(() => {
    applying.value = false;
  }, 1000);
}
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="flex h-12 items-center gap-4 p-2 px-4">
      <RouterLink to="/">
        <ArrowLeftIcon class="size-6" />
      </RouterLink>
      Réglages
    </header>

    <div class="flex grow flex-col gap-12 p-6">
      <div>
        <label class="block">
          Tarif horaire par défaut
          <input
            v-model="settings.hourlyRate"
            class="mt-1 w-full border-white/20 bg-transparent focus:bg-black/5 focus:ring-0"
            type="number"
          />
        </label>
        <div class="mt-2 flex items-center gap-2">
          <button
            class="flex items-center gap-1 rounded-full bg-white px-4 py-1 text-slate-950 disabled:opacity-50"
            @click="apply"
            :disabled="applying"
          >
            Appliquer à tous les chronos
          </button>
          <span v-if="applying" class="text-xl">👌</span>
        </div>
      </div>
    </div>
  </div>
</template>
