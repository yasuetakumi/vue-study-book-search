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
          <g-input-group required :title="'Title'">
            <v-text-field outlined v-model="item.title"></v-text-field>
          </g-input-group>
          <g-input-group required :title="'Customer'">
            <v-select
              v-model="item.customer"
              :items="formData.customers"
            ></v-select>
          </g-input-group>
          <g-input-group required :title="'Attendee'">
            <v-radio-group v-model="item.attendee" row>
              <v-radio
                v-for="attendee in formData.attendees"
                :key="attendee.value"
                :label="attendee.text"
                :value="attendee.value"
              >
              </v-radio>
            </v-radio-group>
          </g-input-group>
          <g-input-group required :title="$t('general.time.date')">
            <g-date-picker v-model="item.date"></g-date-picker>
          </g-input-group>

          <g-input-group optional :title="'Image Location'">
            <g-image-input v-model="item.locImage"></g-image-input>
          </g-input-group>
          <v-btn type="submit">SUBMIT</v-btn>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { store, getForm, update } from "@services/crud";
import GInputGroup from "@components/form_input/GInputGroup.vue";
import GDatePicker from "../../_components/form_input/GDatePicker.vue";
import GImageInput, {
  imageInitial
} from "../../_components/form_input/GImageInput.vue";
export default {
  data() {
    return {
      rules: {},
      item: {
        id: null,
        title: "",
        customer: "",
        date: new Date().toISOString().substr(0, 10),
        dateMulti: [],
        attendee: 0,
        locImage: imageInitial()
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
        payload.append("meeting_date", this.item.date);
        payload.append(
          "location_image_modified",
          this.item.locImage.isModified ? 1 : 0
        );
        if (this.item.locImage.file) {
          payload.append("location_image", this.item.locImage.file);
        }
        const res = this.editPage
          ? await update(this.submitUrl, payload, options)
          : await store(this.submitUrl, payload, options);
        if (res) {
          this.$router.push({ name: "dummy-meetings" });
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
      this.item = {
        ...this.item,
        title: item.title,
        customer: item.customer,
        attendee: item.attendee,
        date: item.meeting_date
      };
      if (item.location_image_url) {
        this.item.locImage.url = item.location_image_url;
      }
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
    GInputGroup,
    GDatePicker,
    GImageInput
  }
};
</script>
