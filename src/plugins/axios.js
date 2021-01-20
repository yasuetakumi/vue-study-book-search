import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

/* About csrf token specification of Laravel6
  - X-CSRF-TOKEN: Specified token on html tag. It is priority than X-XSRF-TOKEN.
  - X-XSRF-TOKEN: Automatically set from cookie-value by axios. Laravel refer it if there is no X-CSRF-TOKEN.
      -> Normally, we don't have to specify token because it is appended automatically by axios.
*/

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Vue.use(VueAxios, axios);
