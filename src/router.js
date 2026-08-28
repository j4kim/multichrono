import { createWebHashHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ChronoView from "./views/ChronoView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/:chronoId", component: ChronoView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
