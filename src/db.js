import { useStorage } from "@vueuse/core";
import GUN from "gun";
import { computed, ref, watch } from "vue";

const urlDbId = new URLSearchParams(location.search).get("db");

export const dbId = urlDbId ? ref(urlDbId) : useStorage("dbId");

export async function getGunValue(gunNode) {
  return await new Promise((resolve) => {
    gunNode.once((value, key) => {
      console.log(key, "once callback", value);
      if (value) {
        resolve(JSON.parse(value));
        return;
      }
      resolve(value);
    });
  });
}

export async function putGunValue(gunNode, newValue) {
  return await new Promise((resolve) => {
    gunNode.put(JSON.stringify(newValue), resolve);
  });
}

export async function useGun(key, defaultValue) {
  const gun = GUN(["https://gun.jo2.ch/gun"]);

  const gunNode = gun.get("multichrono-" + dbId.value).get(key);

  let gunValue = await getGunValue(gunNode);

  if (!gunValue) {
    console.log(key, "Put default gun value", key, defaultValue);
    await putGunValue(gunNode, defaultValue);
    gunValue = defaultValue;
  }

  const keyRef = ref(gunValue);

  const jsonValue = computed(() => JSON.stringify(keyRef.value));

  gunNode.on(function (value, key, _msg, _ev) {
    if (value === jsonValue.value) {
      console.log(key, "on", "value did not change");
      return;
    }
    console.log(key, "on", value);

    keyRef.value = JSON.parse(value);
  });

  watch(
    keyRef,
    async (newValue) => {
      console.log(key, "watch", newValue);
      await putGunValue(gunNode, newValue);
    },
    { deep: true },
  );

  return keyRef;
}

export async function createRef(key, defaultValue) {
  if (dbId.value) {
    return await useGun(key, useStorage(key, defaultValue).value);
  } else {
    return useStorage(key, defaultValue);
  }
}

export async function connectToDb() {
  const newDbId = prompt("ID de la base de données");
  if (
    confirm(
      "Si la base de données existe, vos données locales seront remplacées. Sinon, la base de données sera créée avec vos données locales. OK ?",
    )
  ) {
    dbId.value = newDbId;
    location.reload();
  }
}

export async function disconnectFromDb() {
  if (
    confirm(
      "Les données actuelles seront remplacées par vos données locales. OK ?",
    )
  ) {
    dbId.value = null;
    location.reload();
  }
}
