import { useStorage } from "@vueuse/core";
import GUN from "gun";
import { ref } from "vue";

const urlDbId = new URLSearchParams(location.search).get("db");

export const dbId = urlDbId ? ref(urlDbId) : useStorage("dbId");

export async function getGunValue(gunStore) {
  return await new Promise((resolve) => {
    gunStore.on((value, key) => {
      console.log(">>>", value, key);
      if (value && value._) {
        delete value._;
      }
      resolve(value);
    });
  });
}

export async function putGunValue(gunStore, newValue) {
  return await new Promise((resolve) => {
    gunStore.put(newValue, resolve);
  });
}

export async function useGun(key, defaultValue) {
  const gun = GUN(["https://gun.jo2.ch/gun"]);

  const gunStore = gun.get("multichrono-" + dbId.value).get(key);

  let gunValue = await getGunValue(gunStore);

  if (!gunValue) {
    console.log("Put default gun value", key, defaultValue, dbId.value);
    await putGunValue(gunStore, defaultValue);
    gunValue = defaultValue;
  } else {
    console.log("Existing gun value", key, gunValue, dbId.value);
  }

  return ref(gunValue);
}

export async function createRef(key, defaultValue) {
  if (dbId.value) {
    return await useGun(key, defaultValue);
  } else {
    return useStorage(key, defaultValue);
  }
}
