<template>
  <v-app id="inspire">
    <v-progress-linear indeterminate v-if="loadingPage"></v-progress-linear>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({}),
  computed: mapState({
    loadingPage: state => state.global.loadingPage,
  }),
};
</script>
