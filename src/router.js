import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ChronoView from "./views/ChronoView.vue";
import SettingsView from "./views/SettingsView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/chrono/:index", component: ChronoView },
  { path: "/settings", component: SettingsView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
