import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const clock = ref(Date.now());

export function updateClock() {
  clock.value = Date.now();
}

setInterval(updateClock, 500);

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

export function start(chrono) {
  updateClock();
  chrono.started_at = clock.value;
  chrono.state = "started";
}

export function pause(chrono) {
  updateClock();
  chrono.offset = chrono.offset + clock.value - chrono.started_at;
  chrono.state = "paused";
}

export function stop(chrono) {
  updateClock();
  chrono.state = "initial";
  chrono.offset = 0;
}

export function getMs(chrono) {
  if (chrono.state === "started") {
    const elapsed = Math.max(0, clock.value - chrono.started_at);
    return chrono.offset + elapsed;
  } else if (chrono.state === "paused") {
    return chrono.offset;
  }
  return 0;
}

export function getBgClass(chrono) {
  return (
    {
      initial: "bg-slate-900",
      paused: "bg-slate-800",
      started: "bg-cyan-900",
    }[chrono.state] ?? "bg-red-700"
  );
}

export function getColorClass(chrono) {
  return (
    {
      initial: "text-slate-900",
      paused: "text-slate-800",
      started: "text-cyan-900",
    }[chrono.state] ?? "text-red-700"
  );
}
