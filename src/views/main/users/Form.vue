<template>
  <div>
    <v-skeleton-loader
      v-if="loadingComponent"
      type="card-avatar, article, actions"
    >
    </v-skeleton-loader>
    <v-sheet
      v-if="!loadingComponent"
      elevation="1"
      min-height="70vh"
      width="100%"
      :rounded="'sm'"
    >
      <v-container class="px-10">
        <v-form ref="userForm" @submit.prevent="submit">
          <input-group required :title="$t('general.auth.email')">
            <v-text-field
              :rules="rules.email"
              placeholder="$t('general.placeholder.email')"
              outlined
              v-model="email"
            ></v-text-field>
          </input-group>
          <input-group required :title="$t('general.user.fullName')">
            <v-text-field
              :rules="rules.name"
              placeholder="$t('general.placeholder.fullName')"
              outlined
              v-model="displayName"
            ></v-text-field>
          </input-group>
          <input-group required :title="$t('general.auth.password')">
            <password-input
              :rules="rules.password"
              outlined
              v-model="password"
            ></password-input>
          </input-group>
          <input-group optional :title="$t('general.user.profPic')">
            <image-input accept="image/*" v-model="profPic"></image-input>
          </input-group>
          <v-btn type="submit">SUBMIT</v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import InputGroup from "@/components/InputGroup.vue";
import { store, show, update } from "@services/crud";
import PasswordInput from "../../../components/PasswordInput.vue";
import ImageInput from "../../../components/ImageInput.vue";
export default {
  data() {
    return {
      rules: {
        name: [v => !!v || "Name is required"],
        password: [v => !!v || "Password is required"],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ]
      },
      editPage: false,
      submitUrl: "",
      loadingComponent: false,
      id: null,
      email: "",
      displayName: "",
      password: "",
      profPic: null
    };
  },
  methods: {
    async submit() {
      console.log(this.profPic);
      if (this.$refs.userForm.validate()) {
        let options = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let payload = new FormData();
        payload.append("email", this.email);
        payload.append("display_name", this.displayName);
        payload.append("password", this.password);
        payload.append("prof_pic", this.profPic);
        const res = this.editPage
          ? await update(this.url, payload, options)
          : await store(this.url, payload, options);
        if (res) {
          console.log(res);
        }
      }
    }
  },
  async created() {
    if (this.$route.meta.editPage) {
      this.loadingComponent = true;
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
      this.loadingComponent = false;
    } else {
      this.url = "users";
    }
  },
  components: {
    InputGroup,
    PasswordInput,
    ImageInput
  }
};
</script>
