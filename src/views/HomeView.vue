<script setup>
import Draggable from "vuedraggable";
import Chrono from "../components/Chrono.vue";
import DeleteModal from "../components/DeleteModal.vue";
import RenameModal from "../components/RenameModal.vue";
import UpdateRateModal from "../components/UpdateRateModal.vue";
import UpdateTimeModal from "../components/UpdateTimeModal.vue";
import { dbId } from "../db.js";
import { add, orderedChronoIds } from "../store.js";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex flex-col">
    <header class="flex h-12 items-center justify-between gap-4 p-2 px-4">
      <a href="/" class="link">multichrono</a>
      <div v-if="dbId" class="text-slate-500">({{ dbId }})</div>
      <div class="grow"></div>
      <PlusIcon class="link size-6" @click="() => add()" />
      <RouterLink to="/settings">
        <Cog6ToothIcon class="link size-6" />
      </RouterLink>
    </header>
    <Draggable
      class="flex grow flex-col gap-1"
      :list="orderedChronoIds"
      :item-key="(id) => id"
      handle=".handle"
    >
      <template #item="{ element: id }">
        <Chrono :key="id" :id="id" />
      </template>
    </Draggable>
    <RenameModal />
    <UpdateTimeModal />
    <UpdateRateModal />
    <DeleteModal />
  </div>
</template>
