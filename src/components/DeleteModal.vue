<script setup>
import { useTemplateRef, watch } from "vue";
import { deleteModal, remove } from "../store";

const dialog = useTemplateRef("dialog");

watch(deleteModal, async (chronoId) => {
  console.log(chronoId, "delete modal");
  if (!chronoId) {
    dialog.value.close();
    return;
  }
  dialog.value.showModal();
});

function cancel() {
  deleteModal.value = null;
}

function deleteChrono() {
  remove(deleteModal.value);
  deleteModal.value = null;
}
</script>

<template>
  <dialog ref="dialog" class="modal">
    <div class="modal-box">
      <h3 class="mb-4 text-lg font-bold">Supprimer le chrono</h3>

      <p>Sûr ?</p>

      <div class="modal-action">
        <button class="btn btn-ghost" @click="cancel">Annuler</button>
        <button class="btn btn-soft btn-error" @click="deleteChrono">
          Supprimer
        </button>
      </div>
    </div>
  </dialog>
</template>
