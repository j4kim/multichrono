import { useStorage } from "@vueuse/core";
import { ref } from "vue";

// States

export const settings = useStorage("settings", {
  hourlyRate: 30,
});

export function newChronoId() {
  return Date.now() + "." + Math.random();
}

export const chronos = useStorage("chronos", {
  [newChronoId()]: newChrono(null),
});

export function newChrono(label) {
  return {
    label,
    state: "initial",
    offset: 0,
    hourlyRate: settings.value.hourlyRate,
  };
}

// Clock

export const clock = ref(Date.now());

export function updateClock() {
  clock.value = Date.now();
}

setInterval(updateClock, 500);

// Chrono management

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

export function remove(id) {
  delete chronos.value[id];
}

export function add(label) {
  chronos.value[newChronoId()] = newChrono(label);
}

export function confirmAndRemove(id) {
  const confirmed = confirm("Supprimer le chrono ?");
  if (confirmed) {
    remove(id);
  }
  return confirmed;
}

export function getMs(chrono) {
  if (chrono.state === "started") {
    const elapsed = Math.max(0, clock.value - chrono.started_at);
    return chrono.offset + elapsed;
  }
  return chrono.offset;
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

export function getStateString(chrono) {
  return (
    {
      initial: "Non démarré",
      paused: "En pause",
      started: "En cours",
    }[chrono.state] ?? "?"
  );
}
