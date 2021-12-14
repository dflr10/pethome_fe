import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Pet from "./components/Pet.vue";
import Adoptions from "./components/Adoptions.vue"
import Avaliables from "./components/Avaliables.vue";

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
  {
    path: "/user/pet",
    name: "pet",
    component: Pet,
  },
  {
    path: "/user/adoptions",
    name: "adoptions",
    component: Adoptions,
  },
  {
    path: "/user/avaliables",
    name: "avaliables",
    component: Avaliables,
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
