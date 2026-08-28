import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const clock = ref(Date.now());

setInterval(() => (clock.value = Date.now()), 1000);

export function newChrono(label) {
  return {
    id: Date.now() + "." + Math.random(),
    label,
    state: "initial",
  };
}

export const chronos = useStorage("chronos", [
  newChrono("Cible 1"),
  newChrono("Cible 2"),
  newChrono("Cible 3"),
  newChrono("Cible 4"),
]);

export function start(index) {
  const chrono = chronos.value[index];
  chrono.started_at = Date.now();
  chrono.state = "started";
}
