<template>
  <div>
    <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-sheet v-if="!loadingComponent" elevation="1" min-height="70vh" width="100%" :rounded="'sm'">
      <GBackButton :targetRoute="{ name:'users' }">
      </GBackButton>
      <v-container class="pr-10 pl-10 pt-10">
        <v-row>
          <v-col cols="12" lg="10">
            <v-form ref="userForm" @submit.prevent="submit">
              <g-input-group required :title="$t('general.auth.email')">
                <v-text-field
                  :rules="rules.email"
                  :placeholder="$t('general.placeholder.email')"
                  outlined
                  dense
                  v-model="item.email"
                  :error-messages="allerror.email"
                ></v-text-field>
              </g-input-group>
              <g-input-group required :title="$t('general.user.fullName')">
                <v-text-field
                  :rules="rules.name"
                  :placeholder="$t('general.placeholder.fullName')"
                  outlined
                  dense
                  v-model="item.displayName"
                  :error-messages="allerror.display_name"
                ></v-text-field>
              </g-input-group>
              <g-input-group :required="editPage ? false:true" :title="$t('general.auth.password')">
                <g-password-input 
                  :rules="editPage ? [] : rules.password"
                  outlined dense 
                  v-model="item.password" 
                  :error-messages="allerror.password">
                </g-password-input>
              </g-input-group>
              <div class="pt-10">
                <v-btn :disabled="disableButton" type="submit">{{ $t('general.crud.submit') }}</v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { store, getForm, update } from '@services/crud';
import GInputGroup from '@components/form_input/GInputGroup.vue';
import GPasswordInput from '@components/form_input/GPasswordInput.vue';
import GBackButton from '@components/GBackButton.vue';
export default {
  data() {
    return {
      rules: {
        name: [v => !!v || this.$i18n.t('general.user.name') + this.$i18n.t('general.validation.required')],
        password: [v => !!v || this.$i18n.t('general.auth.password') + this.$i18n.t('general.validation.required')],
        email: [v => !!v || this.$i18n.t('general.auth.email') + this.$i18n.t('general.validation.required'), v => /.+@.+\..+/.test(v) || this.$i18n.t('general.validation.emailValid')],
      },
      item: {
        id: null,
        email: '',
        displayName: '',
        password: '',
      },
      formData: {},
      editPage: false,
      submitUrl: '',
      loadingComponent: false,
      allerror: '',
      disableButton: false,
    };
  },
  methods: {
    async submit() {
      if (this.$refs.userForm.validate()) {
        this.disableButton = true;
        let options = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        let payload = new FormData();
        payload.append('email', this.item.email);
        payload.append('display_name', this.item.displayName);
        payload.append('password', this.item.password);
        const res = this.editPage
          ? await update(this.submitUrl, payload, options)
          : await store(this.submitUrl, payload, options);

        //get retrun data of API if success return to list, else show errors
        if (res == true) {
          this.disableButton = false;
          this.$router.push({ name: 'users' });
        }else{
          this.allerror = res;
          this.disableButton = false;
        }
      }
    },
  },
  async created() {
    this.loadingComponent = true;
    try {
      const form = await getForm(this.$route.path);
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
      console.log(err);
    }
    this.loadingComponent = false;
  },
  components: {
    GInputGroup,
    GPasswordInput,
    GBackButton,
  },
};
</script>
