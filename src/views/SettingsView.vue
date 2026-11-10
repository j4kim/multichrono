<script setup>
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { add, settings, chronos } from "../store.js";
import { ref } from "vue";
import { connectToDb, dbId, disconnectFromDb } from "../db.js";

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
        <div class="mb-2">Base de données</div>
        <div v-if="dbId" class="flex items-center gap-4">
          {{ dbId }}
          <button class="red-btn" @click="disconnectFromDb">
            <XMarkIcon class="inline size-5" />
            <span class="hidden sm:inline">Déconnecter</span>
          </button>
        </div>
        <button class="btn" @click="connectToDb" v-else>Connecter</button>
      </div>
    </div>
  </div>
</template>
