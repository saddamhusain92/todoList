import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from '../views/Login.vue'
import Register from "../views/Register.vue";
import Sticky from "../views/StickyPage.vue";
import MobileOTP from '../views/MobileOTP.vue'
import { supabase } from "../supabase/init";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      auth: true,
    },
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/sticky",
    name: "Sticky",
    component: Sticky,
    meta: {
      title: "Sticky",
      auth: true,
    },
  },
  {
    path: "/otp",
    name: "MobileOtp",
    component: MobileOTP,
    meta: {
      title: " Mobile OTP",
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | My sticky`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;