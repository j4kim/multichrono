<script setup>
import { nextTick, ref, useTemplateRef, watch } from "vue";
import { updateRateModal } from "../store";

const dialog = useTemplateRef("dialog");

const newRate = ref();

watch(updateRateModal, async (chrono) => {
  if (!chrono) {
    dialog.value.close();
    newRate.value = null;
    return;
  }
  newRate.value = chrono.hourlyRate;
  dialog.value.showModal();
  await nextTick(() => {
    const input = dialog.value.querySelector("input");
    input.focus();
    input.select();
  });
});

function cancel() {
  updateRateModal.value = null;
}

function update() {
  updateRateModal.value.hourlyRate = newRate.value;
  updateRateModal.value = null;
}
</script>

<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box max-w-sm">
      <h3 class="mb-4 text-lg font-bold">Tarif horaire</h3>

      <input
        v-model="newRate"
        type="number"
        placeholder="Type here"
        class="input w-full"
        @keyup.enter="update"
      />

      <div class="modal-action">
        <button class="btn btn-ghost" @click="cancel">Annuler</button>
        <button class="btn" @click="update">Valider</button>
      </div>
    </div>
  </dialog>
</template>
