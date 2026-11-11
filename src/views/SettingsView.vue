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
      <fieldset class="fieldset text-base">
        <legend class="fieldset-legend">Tarif horaire par défaut</legend>
        <input
          v-model="settings.hourlyRate"
          class="input"
          type="text"
          pattern="\d*"
          inputmode="numeric"
        />
        <div class="mt-2 flex items-center gap-2">
          <button class="btn" @click="apply" :disabled="applying">
            Appliquer à tous les chronos
          </button>
          <span v-if="applying" class="text-xl">👌</span>
        </div>
      </fieldset>

      <fieldset class="fieldset text-base">
        <legend class="fieldset-legend">
          Valeur du chrono au démarrage (en minutes)
        </legend>
        <input
          v-model="settings.startOffsetMinutes"
          class="input"
          type="number"
        />
      </fieldset>

      <fieldset class="fieldset block text-base">
        <legend class="fieldset-legend">Base de données</legend>
        <div v-if="dbId" class="flex items-center gap-4">
          {{ dbId }}
          <button class="btn btn-error btn-soft" @click="disconnectFromDb">
            <XMarkIcon class="size-5" />
            <span>Déconnecter</span>
          </button>
        </div>
        <button class="btn" @click="connectToDb" v-else>Connecter</button>
      </fieldset>
    </div>
  </div>
</template>
