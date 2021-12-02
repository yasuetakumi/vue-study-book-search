<template>
  <v-app id="inspire">
    <v-progress-linear indeterminate v-if="loadingPage"></v-progress-linear>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  metaInfo() {
    return {
      title: 'Grune 開発用SPAスターターキット| 日本人対応のGruneオフショア開発',
    };
  },
  data: () => ({}),
  computed: mapState({
    loadingPage: state => state.global.loadingPage,
  }),
};
</script>
