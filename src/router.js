//importar elementos

import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";

//creacion del bloque ruta

const routes = [
  {
    path: "/",
    name: "root",
    component: App,
  },
  {
    path: "/user/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/user/home",
    name: "home",
    component: Home,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
