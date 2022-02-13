import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Detection from '../views/Detection'
// import DetectionTest from '../views/Detection-Test'
Vue.use(VueRouter);
const includePush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return includePush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about_us",
    name: "About_us",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About_us.vue"),
  },
  {
    path: "/case",
    name: "case",
    component: () => import("../views/Case.vue"),
  },
  {
    path: "/detection",
    name: "detection",
    meta: { isAuth: true },
    // redirectTo: "/detection/test",
    // redirect: {
    //   name: "test",
    // },
    children: [
      {
        path: "test",
        name: "test",
        component: () => import("../views/Detection-Test"),
      },
      {
        path: "/detection/record",
        name: "detection_record",
        component: () => import("../views/Detection-Record"),
      },
      {
        path: "/detection/mark",
        name: "detection_mark",
        component: () => import("../views/Detection-Mark"),
      },
      {
        path: "/detection/buy",
        name: "detection_buy",
        component: () => import("../views/Detection-Buy"),
      },
    ],
    beforeEnter(to, from, next) {
      console.log(to);
      if (to.meta.isAuth) {
        if (localStorage.getItem("token")) {
          next();
        } else {
          router.push({
            name: "login",
          });
        }
      }
    },
    component: Detection
    // component: () => import("../views/Detection.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
