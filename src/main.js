import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./localization";

import vuetify from "./plugins/vuetify";
import "@/plugins/axios.js";
import "@/plugins/v-currency-field.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
