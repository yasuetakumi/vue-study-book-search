<template>
  <v-app id="inspire">
    <loading-page v-if="isLoadingPage"></loading-page>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import LoadingPage from "./views/layouts/LoadingPage.vue";
export default {
  data: () => ({}),
  computed: mapState({
    isLoadingPage: state => state.global.isLoadingPage
  }),
  created() {},
  components: {
    "loading-page": LoadingPage
  }
};
</script>
