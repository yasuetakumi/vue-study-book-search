<template>
  <v-main>
    <v-card
      :loading="isLoading"
      class="login-card"
      max-width="374"
      style="top:50%"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>Welcome</v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>
      <v-form class="ma-3">
        <v-text-field
          label="Email"
          v-model="email"
          placeholder=""
          outlined
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          placeholder=""
          outlined
          required
        ></v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn block class="pa-2" color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    email: "",
    password: "",
    remember: false
  }),

  computed: mapState({
    isLoading: state => state.auth.isLoading
  }),

  methods: {
    login() {
      let credentials = {
        email: this.email,
        password: this.password,
        remember: this.remember
      };
      this.$store.dispatch("auth/login", credentials);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
