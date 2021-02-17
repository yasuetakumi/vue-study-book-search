import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import vuexStore from '@/store';
import vueRouter from '@/router';
import { pushNotif } from '@/helpers';
const { isNavigationFailure } = VueRouter;

/* About csrf token specification of Laravel6
  - X-CSRF-TOKEN: Specified token on html tag. It is priority than X-XSRF-TOKEN. For native blade template.
  - X-XSRF-TOKEN: Automatically set from cookie-value by axios. Laravel refer it if there is no X-CSRF-TOKEN.
      -> Normally, we don't have to specify token because it is appended automatically by axios.
*/
const config = {
  withCredentials: true,
  crossDomain: true,
  baseURL: process.env.VUE_APP_API_ENDPOINT,
};

let api = axios.create(config);
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status == 401) {
      vuexStore.commit('auth/logout');
      vueRouter
        .push({
          name: 'login',
          query: { redirect: vueRouter.currentRoute.fullPath },
        })
        .catch(function(failure) {
          if (isNavigationFailure(failure)) {
            /* --- Do nothing ---
            /  This sometimes happen when there is another navigation happening
            /  while the current one has not finished yet.
            */
          }
        });
    } else {
      throw error;
    }
  }
);

Vue.use(VueAxios, api);
const ApiError = function(err) {
  this.isHandled = false;
  this.response = err.response;
};

ApiError.prototype.pushErrorToNotif = function(isPushed) {
  if (!this.isHandled && isPushed && this.response.data.message) {
    pushNotif(this.response.data.message, 'error');
    this.isHandled = true;
    return this;
  } else {
    return this;
  }
};

export const handleApiError = function(err, isPushedToNotif = false) {
  let remainingErr = new ApiError(err).pushErrorToNotif(isPushedToNotif);

  return remainingErr;
};
