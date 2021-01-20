<template>
  <div>
    <base-nav-left></base-nav-left>
    <base-app-bar></base-app-bar>

    <v-main>
      <notification-snackbar></notification-snackbar>
      <v-progress-linear v-if="loadingPage" indeterminate></v-progress-linear>
      <v-container class="py-8 px-6 mb-10" fluid>
        <router-view :key="$route.path"></router-view>
      </v-container>
      <base-footer></base-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseAppBar from "./components/BaseAppBar.vue";
import BaseFooter from "./components/BaseFooter";
import BaseNavLeft from "./components/BaseNavLeft.vue";
import NotificationSnackbar from "./components/NotificationSnackbar.vue";
export default {
  computed: mapState({
    loadingPage: state => state.global.loadingPage
  }),
  components: {
    BaseFooter,
    BaseNavLeft,
    BaseAppBar,
    NotificationSnackbar
  }
};
</script>
