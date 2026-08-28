export function newChrono(label) {
  return {
    id: Date.now() + "." + Math.random(),
    label,
    state: "initial",
  };
}
