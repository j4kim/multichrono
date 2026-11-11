<script setup>
import { nextTick, ref, useTemplateRef, watch } from "vue";
import { updateTimeModal } from "../store";

const dialog = useTemplateRef("dialog");

const minutes = ref();

watch(updateTimeModal, async (chrono) => {
  if (!chrono) {
    dialog.value.close();
    minutes.value = null;
    return;
  }
  dialog.value.showModal();
  await nextTick(() => {
    const input = dialog.value.querySelector("input");
    input.focus();
    input.select();
  });
});

function cancel() {
  updateTimeModal.value = null;
}

function update() {
  if (minutes.value === null || minutes.value === "" || isNaN(minutes.value)) {
    return;
  }
  const ms = +minutes.value * 60000;
  updateTimeModal.value.started_at = Date.now();
  updateTimeModal.value.offset = ms;
  updateTimeModal.value = null;
}
</script>

<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box max-w-sm">
      <h3 class="mb-4 text-lg font-bold">Modifier le temps manuellement</h3>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Minutes</legend>
        <input
          v-model="minutes"
          type="number"
          inputmode="numeric"
          placeholder="Type here"
          class="input w-full"
          @keyup.enter="update"
        />
      </fieldset>

      <div class="modal-action">
        <button class="btn btn-ghost" @click="cancel">Annuler</button>
        <button class="btn" @click="update">Valider</button>
      </div>
    </div>
  </dialog>
</template>
