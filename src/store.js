import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const clock = ref(Date.now());

export function updateClock() {
  clock.value = Date.now();
}

export let clockInterval = null;

export function startClock() {
  updateClock();
  if (clockInterval) {
    clearInterval(clockInterval);
  }
  clockInterval = setInterval(updateClock, 1000);
}

startClock();

export function newChrono(label) {
  return {
    id: Date.now() + "." + Math.random(),
    label,
    state: "initial",
    offset: 0,
  };
}

export const chronos = useStorage("chronos", [
  newChrono("Cible 1"),
  newChrono("Cible 2"),
  newChrono("Cible 3"),
  newChrono("Cible 4"),
]);

export function start(index) {
  startClock();
  const chrono = chronos.value[index];
  chrono.started_at = clock.value;
  chrono.state = "started";
}

export function pause(index) {
  startClock();
  const chrono = chronos.value[index];
  chrono.offset = chrono.offset + clock.value - chrono.started_at;
  chrono.state = "paused";
}
