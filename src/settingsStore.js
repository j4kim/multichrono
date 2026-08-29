import { useStorage } from "@vueuse/core";

export const settings = useStorage("settings", {
  hourlyRate: 30,
});
