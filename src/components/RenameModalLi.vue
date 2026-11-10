<script setup>
import { PencilIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  chrono: Object,
  id: String,
});

function openRenameModal() {
  const dialog = document.getElementById(`${props.id}-rename-dialog`);
  dialog.showModal();
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
        <input type="text" placeholder="Type here" class="input input-lg" />

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
