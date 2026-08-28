import { useStorage } from "@vueuse/core";
import { ref } from "vue";

export const clock = ref(Date.now());

export function updateClock() {
  clock.value = Date.now();
}

setInterval(updateClock, 500);

class Chrono {
  constructor(label) {
    this.id = Date.now() + "." + Math.random();
    this.label = label;
    this.state = "initial";
    this.offset = 0;
  }

  static deserialize(obj) {
    var c = new Chrono();
    Object.keys(obj).forEach(function (key) {
      c[key] = obj[key];
    });
    return c;
  }
}

export const chronos = useStorage(
  "chronos",
  [
    new Chrono("Cible 1"),
    new Chrono("Cible 2"),
    new Chrono("Cible 3"),
    new Chrono("Cible 4"),
  ],
  undefined,
  {
    serializer: {
      read: (v) => {
        const jsonChronos = v ? JSON.parse(v) : [];
        return jsonChronos.map((obj) => Chrono.deserialize(obj));
      },
      write: (v) => JSON.stringify(v),
    },
  },
);

export function start(index) {
  updateClock();
  const chrono = chronos.value[index];
  chrono.started_at = clock.value;
  chrono.state = "started";
}

export function pause(index) {
  updateClock();
  const chrono = chronos.value[index];
  chrono.offset = chrono.offset + clock.value - chrono.started_at;
  chrono.state = "paused";
}
