<script setup>
import { nextTick, ref, useTemplateRef, watch } from "vue";
import { renameModal } from "../store";

const dialog = useTemplateRef("dialog");

const newLabel = ref();

watch(renameModal, async (chrono) => {
  if (!chrono) {
    dialog.value.close();
    newLabel.value = null;
    return;
  }
  newLabel.value = chrono.label;
  dialog.value.showModal();
  await nextTick(() => {
    const input = dialog.value.querySelector("input");
    input.focus();
    input.select();
  });
});

function cancel() {
  renameModal.value = null;
}

function rename() {
  renameModal.value.label = newLabel.value;
  renameModal.value = null;
}
</script>

<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold">Nom du chrono</h3>

      <input
        v-model="newLabel"
        type="text"
        placeholder="Type here"
        class="input w-full"
        @keyup.enter="rename"
      />

      <div class="modal-action">
        <button class="btn btn-ghost" @click="cancel">Annuler</button>
        <button class="btn" @click="rename">Valider</button>
      </div>
    </div>
  </dialog>
</template>
