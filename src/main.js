import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./localization";

import vuetify from "./plugins/vuetify";
import "@/plugins/axios.js";
import "@/plugins/v-currency-field.js";

axios.defaults.withCredentials = true;

axios.defaults.crossDomain = true;


axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

/* About csrf token specification of Laravel6
  - X-CSRF-TOKEN: Specified token on html tag. It is priority than X-XSRF-TOKEN.
  - X-XSRF-TOKEN: Automatically set from cookie-value by axios. Laravel refer it if there is no X-CSRF-TOKEN.
      -> Normally, we don't have to specify token because it is appended automatically by axios.
*/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
