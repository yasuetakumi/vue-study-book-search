<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <template slot="progress">
            <v-progress-linear height="10" indeterminate></v-progress-linear>
          </template>

          <v-card-title>{{ $t("general.auth.welcome") }}</v-card-title>
          <v-card-subtitle>{{
            $t("general.auth.signInMessage")
          }}</v-card-subtitle>
          <v-form class="ma-3" @submit.prevent="login">
            <v-text-field
              :label="$t('general.auth.email')"
              v-model="email"
              placeholder=""
              outlined
              required
            ></v-text-field>
            <v-text-field
              :label="$t('general.auth.password')"
              v-model="password"
              type="password"
              placeholder=""
              outlined
              required
            ></v-text-field>
            <v-card-text class="py-1 px-1 yellow">
              [TEST LOGIN]<br>
              - admin@company.com 12345678<br>
              - user@company.com 12345678<br>
            </v-card-text>
            <v-card-actions>
              <v-btn block class="pa-2" color="primary" type="submit">{{
                $t("general.auth.login")
              }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
      <v-container>
        <locale-selector style="width:150px"></locale-selector>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import LocaleSelector from "@components/LocaleSelector.vue";
export default {
  components: { LocaleSelector },
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
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
