import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./localization";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib"; //Globally import VTextField

Vue.component("v-text-field", VTextField);
Vue.use(VCurrencyField, {
  locale: "pt-BR",
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: true
});

// Automatically append CSRF token.
axios.defaults.xsrfHeaderName = 'X-XSRF-Token';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

// Append Auth information if use basic auth.
if( process.env.VUE_APP_API_ENDPOINT_BASICAUTH_NAME != null){
  let username = process.env.VUE_APP_API_ENDPOINT_BASICAUTH_NAME;
  let password = process.env.VUE_APP_API_ENDPOINT_BASICAUTH_PASS;
  axios.defaults.headers.common['Authorization'] = 'Basic '+ btoa(username + ':' + password);
}

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
