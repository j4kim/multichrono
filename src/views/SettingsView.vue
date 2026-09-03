<script setup>
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import {
  add,
  settings,
  chronos,
  confirmAndRemove,
  getStateString,
} from "../store.js";
import { ref } from "vue";

const applying = ref(false);

function apply() {
  Object.values(chronos.value).forEach(
    (chrono) => (chrono.hourlyRate = settings.value.hourlyRate),
  );
  applying.value = true;
  setTimeout(() => {
    applying.value = false;
  }, 1000);
}

function addChrono() {
  const label = prompt("Nom");
  add(label);
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
            class="input mt-1"
            type="number"
          />
        </label>
        <div class="mt-2 flex items-center gap-2">
          <button class="btn" @click="apply" :disabled="applying">
            Appliquer à tous les chronos
          </button>
          <span v-if="applying" class="text-xl">👌</span>
        </div>
      </div>

      <div>
        <label class="block">
          Valeur du chrono au démarrage (en minutes)
          <input
            v-model="settings.startOffsetMinutes"
            class="input mt-1"
            type="number"
          />
        </label>
      </div>

      <div>
        <div>Chronos</div>
        <table class="mt-1 w-full">
          <tr v-for="(chrono, id) in chronos">
            <td class="pr-2">
              <RouterLink
                :to="`/chrono/${id}`"
                class="font-bold text-cyan-500 hover:underline"
              >
                {{ chrono.label ?? "(sans nom)" }}
              </RouterLink>
            </td>
            <td class="pr-2">
              <span v-if="chrono.hourlyRate">
                CHF {{ chrono.hourlyRate }}
              </span>
            </td>
            <td class="pr-2">{{ getStateString(chrono) }}</td>
            <td>
              <button class="red-btn my-2" @click="confirmAndRemove(id)">
                <XMarkIcon class="inline size-5" />
                <span class="hidden sm:inline">Supprimer</span>
              </button>
            </td>
          </tr>
        </table>
        <button class="btn my-2" @click="addChrono">
          <PlusIcon class="inline size-5" />
          <span>Ajouter un chrono</span>
        </button>
      </div>
    </div>
  </div>
</template>
