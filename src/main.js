import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import element from "@/element";

Vue.config.productionTip = false;
Vue.use(element);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
