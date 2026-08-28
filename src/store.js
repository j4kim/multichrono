import { useStorage } from "@vueuse/core";
import { newChrono } from "./chrono";

export const chronos = useStorage("chronos", [
  newChrono("Cible 1"),
  newChrono("Cible 2"),
  newChrono("Cible 3"),
  newChrono("Cible 4"),
]);
