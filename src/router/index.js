import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import Home from "../views/HomeView.vue";
import View from "../views/ProductView.vue";
import CartView from "../views/CartView.vue";
import ProductAdd from "../components/ProductAdd.vue";

import { getItemFromLocalStorage } from "@/utils/localStorage.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/Addproduct",
      name: "Addproduct",
      component: ProductAdd,
    },
    {
      path: "/user/login",
      name: "user/login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
      // Here is using route guards if its logged in then should stay on home page
      beforeEnter: (to, from, next) => {
        const user = getItemFromLocalStorage("user")
        const token = user ? user.token : null;
        if (token) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/viewProduct/:id",
      name: "viewProduct",
      component: View,
    },
    {
      path: "/cartProduct",
      name: "cartProduct",
      component: CartView,
      // Here is using route guards if its logged in then should stay on home page
      beforeEnter: (to, from, next) => {
        const user = getItemFromLocalStorage("user")
        const token = user ? user.token : null;
        if (!token) {
          next("/user/login");
        } else {
          next();
        }
      },
    }
  ],
});

export default router;
