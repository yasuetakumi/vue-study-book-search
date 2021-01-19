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
        <v-form ref="meetingForm" @submit.prevent="submit">
          <input-group required :title="'Title'">
            <v-text-field outlined v-model="item.title"></v-text-field>
          </input-group>
          <input-group required :title="'Customer'">
            <v-select
              v-model="item.customer"
              :items="formData.customers"
            ></v-select>
          </input-group>
          <input-group required :title="'Attendee'">
            <v-radio-group v-model="item.attendee" row>
              <v-radio
                v-for="attendee in formData.attendees"
                :key="attendee.value"
                :label="attendee.text"
                :value="attendee.value"
              >
              </v-radio>
            </v-radio-group>
          </input-group>
          <input-group required :title="$t('general.time.date')">
            <v-menu
              v-model="item.date.menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="item.date.val"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="item.date.val"
                @input="item.date.menu = false"
              ></v-date-picker>
            </v-menu>
          </input-group>
          <input-group optional :title="'Image Location'">
            <image-input accept="image/*" v-model="item.locImage"></image-input>
          </input-group>
          <v-btn type="submit">SUBMIT</v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import InputGroup from "@/components/InputGroup.vue";
import { store, getForm, update } from "@services/crud";
import ImageInput from "../../../components/ImageInput.vue";
export default {
  data() {
    return {
      rules: {},
      item: {
        id: null,
        title: "",
        customer: "",
        date: {
          val: new Date().toISOString().substr(0, 10),
          menu: false
        },
        attendee: 0,
        locImage: null
      },
      formData: {},
      editPage: false,
      submitUrl: "",
      loadingComponent: false
    };
  },
  methods: {
    async submit() {
      if (this.$refs.meetingForm.validate()) {
        let options = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let payload = new FormData();
        payload.append("title", this.item.title);
        payload.append("customer", this.item.customer);
        payload.append("attendee", this.item.attendee);
        payload.append("meeting_date", this.item.date.val);
        if (this.item.locImage) {
          payload.append("location_image", this.item.locImage);
        }
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
    const form = await getForm(this.$route.path);
    if (this.$route.meta.editPage) {
      this.editPage = true;
      let { formData, submitUrl, item } = form;
      this.item = { ...this.item, ...item };
      this.formData = formData;
      this.submitUrl = submitUrl;
    } else {
      let { formData, submitUrl } = form;
      this.formData = formData;
      this.submitUrl = submitUrl;
    }
    this.loadingComponent = false;
  },
  components: {
    InputGroup,
    ImageInput
  }
};
</script>
