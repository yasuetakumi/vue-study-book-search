<template>
  <div>
    <v-skeleton-loader v-if="loading" type="card-avatar, article, actions">
    </v-skeleton-loader>
    <v-sheet
      v-if="!loading"
      elevation="5"
      min-height="70vh"
      width="100%"
      :rounded="'xl'"
    >
      <v-container class="px-10">
        <input-group :title="$t('general.auth.email')">
          <v-text-field outlined v-model="email"></v-text-field>
        </input-group>
        <input-group :title="$t('general.user.fullName')">
          <v-text-field outlined v-model="displayName"></v-text-field>
        </input-group>
        <input-group :title="$t('general.auth.password')">
          <v-text-field outlined v-model="password"></v-text-field>
        </input-group>
        <v-btn @click="submit">SUBMIT</v-btn>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import InputGroup from "@/components/InputGroup.vue";
import { store, show, update } from "@services/crud";
export default {
  data() {
    return {
      editPage: false,
      submitUrl: "",
      loading: true,
      id: null,
      email: "",
      displayName: "",
      password: ""
    };
  },
  methods: {
    async submit() {
      let payload = {
        email: this.email,
        display_name: this.displayName,
        password: this.password
      };
      const res = this.editPage
        ? await update(this.url, payload)
        : await store(this.url, payload);
      if (res) {
        console.log(res);
      }
    }
  },
  async created() {
    if (this.$route.meta.editPage) {
      this.loading = true;
      const id = this.$route.params.id;
      this.id = id;
      this.url = `users/${id}`;
      const res = await show(this.url);
      if (res) {
        let { email, display_name, password } = res;
        this.email = email;
        this.displayName = display_name;
        this.password = password;
      }
      this.loading = false;
    } else {
      this.url = "users";
    }
  },
  components: {
    InputGroup
  }
};
</script>
