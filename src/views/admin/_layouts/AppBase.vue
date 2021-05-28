<template>
  <div>
    <base-nav-left v-model="drawerOpen"></base-nav-left>
    <base-app-bar v-model="drawerOpen"></base-app-bar>

    <v-main>
      <GDebugLabel></GDebugLabel>
      <base-notification-snackbar></base-notification-snackbar>
      <v-progress-linear v-if="loadingPage" indeterminate></v-progress-linear>
      <v-container class="py-8 px-6 mb-10" fluid>
        <router-view :key="$route.path"></router-view>
      </v-container>
      <base-footer></base-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseAppBar from './BaseAppBar.vue';
import BaseFooter from './BaseFooter';
import BaseNavLeft from './BaseNavLeft.vue';
import BaseNotificationSnackbar from './BaseNotificationSnackbar.vue';
import GDebugLabel from '@views/_components/GDebugLabel.vue';
export default {
  data() {
    return {
      drawerOpen: true,
    };
  },
  computed: mapState({
    loadingPage: state => state.global.loadingPage,
  }),
  components: {
    BaseFooter,
    BaseNavLeft,
    BaseAppBar,
    BaseNotificationSnackbar,
    GDebugLabel
  },
};
</script>
