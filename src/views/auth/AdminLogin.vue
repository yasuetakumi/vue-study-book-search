<template>
  <v-main>
    <GDebugLabel></GDebugLabel>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <v-alert v-model="showAlert" dense type="error">
            The email or password you entered are incorrect.
          </v-alert>
          <template slot="progress">
            <v-progress-linear height="10" indeterminate></v-progress-linear>
          </template>
          <v-card-title class="d-flex justify-center">{{ $t('general.auth.adminLogin') }}</v-card-title>
          <v-form class="ma-3" @submit.prevent="login">
            <v-text-field
              :label="$t('general.auth.email')"
              v-model="email"
              placeholder=""
              :rules="emailRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              :label="$t('general.auth.password')"
              v-model="password"
              type="password"
              placeholder=""
              :rules="passwordRules"
              outlined
              required
            ></v-text-field>
            <v-card-text class="py-1 px-1 " style="border-radius: 8px; background-color:#ddeeff; color:#4466aa;">
              <div class="ml-3">
                <p>以下のログイン情報をお使いください。</p>
                <p>Email: admin@admin.com<br>Password: 12345678 
                <v-btn class="ml-12" small v-on:click="email = 'admin@admin.com'; password= '12345678';">SET</v-btn></p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-checkbox v-model="rememberMe" :label="$t('general.auth.rememberMe')"> </v-checkbox>
              <v-row class="d-flex justify-end mr-1 card-white-space">
                <v-btn class="pa-2" color="primary" type="submit">
                  {{ $t('general.auth.login') }}
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
      <v-container class="d-flex justify-center">
        <v-card width="374" elevation="0">
          <a href="#" class="text-decoration-none">{{ $t('general.auth.moveToUserLogin') }}</a>
        </v-card>
      </v-container>
      <v-container>
        <locale-selector style="width:150px"></locale-selector>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';
import LocaleSelector from '@components/LocaleSelector.vue';
import GDebugLabel from '@views/_components/GDebugLabel.vue';
export default {
  components: { LocaleSelector , GDebugLabel },
  data: () => ({
    showAlert: false,
    email: '',
    password: '',
    remember: false,
    rememberMe: false,
    emailRules: [
      v => !!v || 'E-mail is required',
      v =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'E-mail must be valid',
    ],
    passwordRules: [v => !!v || 'Password is required'],
  }),

  computed: mapState({
    isLoading: state => state.auth.isLoading,
    showAlert: state => state.auth.showAlert,
  }),
  methods: {
    login() {
      let credentials = {
        email: this.email,
        password: this.password,
        remember: this.remember,
        rememberMe: this.rememberMe,
      };
      let guard = 'admin';
      this.$store.dispatch('auth/login', { credentials, guard });
    },
  },
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
