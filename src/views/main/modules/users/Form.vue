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
              outlined
              v-model="item.email"
            ></v-text-field>
          </input-group>
          <input-group required :title="$t('general.user.fullName')">
            <v-text-field
              :rules="rules.name"
              outlined
              v-model="item.displayName"
            ></v-text-field>
          </input-group>
          <input-group required :title="$t('general.auth.password')">
            <password-input
              :rules="rules.password"
              outlined
              v-model="item.password"
            ></password-input>
          </input-group>
          <v-btn type="submit">SUBMIT</v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { store, getForm, update } from "@services/crud";
import InputGroup from "@components/InputGroup.vue";
import PasswordInput from "@components/PasswordInput.vue";
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
      item: {
        id: null,
        email: "",
        displayName: "",
        password: ""
      },
      formData: {},
      editPage: false,
      submitUrl: "",
      loadingComponent: false
    };
  },
  methods: {
    async submit() {
      if (this.$refs.userForm.validate()) {
        let options = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let payload = new FormData();
        payload.append("email", this.item.email);
        payload.append("display_name", this.item.displayName);
        payload.append("password", this.item.password);
        const res = this.editPage
          ? await update(this.submitUrl, payload, options)
          : await store(this.submitUrl, payload, options);
        if (res) {
          console.log(res);
        }
      }
    }
  },
  async created() {
    this.loadingComponent = true;
    try {
      const form = await getForm(this.$route.path);
      console.log(form);
      if (this.$route.meta.editPage) {
        this.editPage = true;
        let { formData, submitUrl, item } = form;
        let { user_role_id: userRole, display_name: displayName, email } = item;
        this.item = { ...this.item, userRole, displayName, email };
        this.formData = formData;
        this.submitUrl = submitUrl;
      } else {
        let { formData, submitUrl } = form;
        this.formData = formData;
        this.submitUrl = submitUrl;
      }
    } catch (err) {
      console.log("error");
    }
    console.log(this.submitUrl);
    this.loadingComponent = false;
  },
  components: {
    InputGroup,
    PasswordInput
  }
};
</script>
