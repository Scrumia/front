import Inventaire from "../views/Inventaire.vue";
import Aventurier from "../views/Aventurier.vue";
import Finances from "../views/Finances.vue";
import Requetes from "../views/Requetes.vue";

import { createRouter, createWebHistory } from "vue-router";
import Connexion from "@/views/Connexion";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Requetes,
  },
  {
    name: "Requetes",
    path: "/inventaire",
    component: Inventaire,
  },
  {
    name: "Aventurier",
    path: "/aventurier",
    component: Aventurier,
  },
  {
    name: "Inventaire",
    path: "/finances",
    component: Finances,
  },
  {
    name: "Connexion",
    path: "/connexion",
    component: Connexion,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
