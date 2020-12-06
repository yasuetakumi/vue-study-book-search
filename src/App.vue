<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
  created() {
    const api = process.env.VUE_APP_API_DOMAIN + "/api/auth-check";
    this.axios
      .get(api, {
        headers: { crossDomain: true, "Content-Type": "application/json" }
      })
      .then(response => {
        console.log(response);
      });
  }
};
</script>
