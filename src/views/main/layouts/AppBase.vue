<template>
  <div>
    <base-nav-left></base-nav-left>
    <base-app-bar></base-app-bar>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
      <base-footer></base-footer>
    </v-main>
  </div>
</template>

<script>
import BaseAppBar from "./components/BaseAppBar.vue";
import BaseFooter from "./components/BaseFooter";
import BaseNavLeft from "./components/BaseNavLeft.vue";
export default {
  components: {
    BaseFooter,
    BaseNavLeft,
    BaseAppBar
  }
};
</script>
