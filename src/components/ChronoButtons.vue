<script setup>
import {
  ClockIcon,
  EllipsisHorizontalIcon,
  PauseCircleIcon,
  PencilIcon,
  PlayCircleIcon,
  StopCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { pause, renameModal, start, stop } from "../store";

const props = defineProps({
  chrono: Object,
  id: String,
  iconClass: {
    type: String,
    default: "size-12 sm:size-14",
  },
});

const stateMachine = {
  initial: ["start"],
  started: ["pause"],
  paused: ["stop", "start"],
};

function allow(action) {
  const allowed = stateMachine[props.chrono.state];
  return allowed.includes(action);
}
</script>

<template>
  <div class="flex flex-wrap gap-2 sm:gap-3">
    <button
      :disabled="!allow('start')"
      @click.stop="start(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <PlayCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      :disabled="!allow('pause')"
      @click.stop="pause(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <PauseCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      :disabled="!allow('stop')"
      @click.stop="stop(chrono)"
      class="disabled:pointer-events-none disabled:opacity-50"
    >
      <StopCircleIcon :class="[iconClass, 'link']" />
    </button>
    <button
      :style="`anchor-name: --other-actions-${id}`"
      :popovertarget="`${id}-actions-popover`"
    >
      <EllipsisHorizontalIcon class="link size-8" />
    </button>
    <ul
      class="dropdown menu rounded-box w-52 bg-slate-800 text-lg shadow-sm"
      popover
      :id="`${id}-actions-popover`"
      :style="`position-anchor: --other-actions-${id}`"
    >
      <li>
        <button class="link" @click="renameModal = chrono">
          <PencilIcon class="size-4" /> Renommer
        </button>
      </li>
      <li>
        <button class="link">
          <ClockIcon class="size-4" /> Modifier le temps
        </button>
      </li>
      <li>
        <button class="link-red"><XMarkIcon class="size-4" /> Supprimer</button>
      </li>
    </ul>
  </div>
</template>
