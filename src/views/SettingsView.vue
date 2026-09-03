<script setup>
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { settings } from "../store.js";
import { ref } from "vue";
import {
  chronos,
  confirmAndRemove,
  getStateString,
  newChrono,
} from "../store.js";

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

function addChrono() {
  const label = prompt("Nom");
  chronos.value.push(newChrono(label));
}
</script>

<template>
  <div class="flex flex-col">
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

      <div>
        <div>Chronos</div>
        <table class="mt-1 w-full">
          <tr v-for="(chrono, index) in chronos">
            <td class="pr-2">
              <RouterLink
                :to="`/chrono/${index}`"
                class="font-bold text-cyan-600 hover:underline"
              >
                {{ chrono.label }}
              </RouterLink>
            </td>
            <td class="pr-2">
              <span v-if="chrono.hourlyRate">
                CHF {{ chrono.hourlyRate }}
              </span>
            </td>
            <td class="pr-2">{{ getStateString(chrono) }}</td>
            <td>
              <button
                class="my-2 flex items-center gap-1 rounded-full bg-red-400 p-0.5 text-slate-950 sm:pr-4 sm:pl-2"
                @click="confirmAndRemove(index)"
              >
                <XMarkIcon class="inline size-5" />
                <span class="hidden sm:inline">Supprimer</span>
              </button>
            </td>
          </tr>
        </table>
        <button
          class="my-2 flex items-center gap-1 rounded-full bg-white p-0.5 pr-4 pl-2 text-slate-950"
          @click="addChrono"
        >
          <PlusIcon class="inline size-5" />
          <span>Ajouter un chrono</span>
        </button>
      </div>
    </div>
  </div>
</template>
