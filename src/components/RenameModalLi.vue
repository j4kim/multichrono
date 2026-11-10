<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const props = defineProps({
  chrono: Object,
  id: String,
});

let dialog;

function openRenameModal() {
  dialog = document.getElementById(`${props.id}-rename-dialog`);
  dialog.showModal();
  const input = dialog.querySelector("input");
  input.focus();
  input.select();
}

const newName = ref(props.chrono.label);

function cancel() {
  newName.value = props.chrono.label;
  dialog.close();
}

function rename() {
  props.chrono.label = newName.value;
  dialog.close();
}
</script>

<template>
  <li>
    <button class="link" @click="openRenameModal">
      <PencilIcon class="size-4" /> Renommer
    </button>
  </li>

  <Teleport to="body">
    <dialog :id="`${id}-rename-dialog`" class="modal">
      <div class="modal-box">
        <h3 class="mb-4 text-lg font-bold">Renommer chrono</h3>

        <input
          v-model="newName"
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
  </Teleport>
</template>
