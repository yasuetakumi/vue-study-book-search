<template>
  <div>
    <v-skeleton-loader v-if="loadingComponent" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-sheet v-if="!loadingComponent" elevation="1" min-height="70vh" width="100%" :rounded="'sm'">
      <GBackButton :targetRoute="{ name: 'dummy_meetings' }"> </GBackButton>
      <v-container class="pr-10 pl-10 pt-10 pb-10">
        <v-row>
          <v-col cols="12" lg="10">
            <v-form ref="meetingForm" @submit.prevent="submit">
              <g-input-group required :title="$t('general.title')">
                <v-text-field outlined v-model="item.title"></v-text-field>
              </g-input-group>
              <g-input-group required :title="$t('general.customer')">
                <v-select outlined v-model="item.customer" :items="formData.customers" item-text="name" item-value="id"></v-select>
              </g-input-group>
              <g-input-group required :title="$t('general.meeting.location')">
                <v-radio-group v-model="item.location" row>
                  <v-radio
                    v-for="location in formData.locations"
                    :key="location.value"
                    :label="getMeetingLocationText(location.text)"
                    :value="location.value"
                  >
                  </v-radio>
                </v-radio-group>
              </g-input-group>
              <g-input-group required :title="$t('general.time.date')">
                <g-date-picker v-model="item.date" dp-color="green" tf-outlined></g-date-picker>
              </g-input-group>

              <g-input-group required :title="$t('general.time.time')">
                <g-time-picker v-model="item.time" tp-color="green" tf-outlined> </g-time-picker>
              </g-input-group>
              <g-input-group optional :title="$t('general.image_location')">
                <g-image-input v-model="item.locImage"></g-image-input>
              </g-input-group>

              <g-input-group optional :title="$t('general.address')">
                <!-- This is just example for modal form
                In general, the use case will be project dependent
                Please use/modify as needed, or create your own per your need -->
                <form-modal>
                  <g-input-group optional :title="$t('general.postcode')">
                    <v-text-field outlined v-model="item.address.postcode"></v-text-field>
                  </g-input-group>
                  <g-input-group optional :title="$t('general.address')">
                    <v-text-field outlined v-model="item.address.address"></v-text-field>
                  </g-input-group>
                  <g-input-group optional :title="$t('general.phone_number')">
                    <v-text-field outlined v-model="item.address.phone"></v-text-field>
                  </g-input-group>
                </form-modal>
              </g-input-group>
              <g-input-group optional :title="$t('general.meeting.registrant')">
                <v-autocomplete
                  v-model="item.registrant"
                  :items="formData.registrants"
                  item-text="display_name" 
                  item-value="id"
                  :no-data-text="$t('general.noDataAvailable')"
                  clearable
                  outlined
                ></v-autocomplete>
              </g-input-group>

              <div class="mt-4" v-if="item.address.postcode!==''">
                <g-input-group optional :title="$t('general.postcode')">
                  <v-text-field outlined v-model="item.address.postcode" readonly></v-text-field>
                </g-input-group>
                <g-input-group optional :title="$t('general.address')">
                  <v-text-field outlined v-model="item.address.address" readonly></v-text-field>
                </g-input-group>
                <g-input-group optional :title="$t('general.phone_number')">
                  <v-text-field outlined v-model="item.address.phone" readonly></v-text-field>
                </g-input-group>
              </div>

              <!-- <g-input-group>
                <v-combobox clearable v-model="item.customer" :items="formData.customers"></v-combobox>
              </g-input-group> -->
              <div class="pt-10">
                <v-btn type="submit">{{ $t('general.crud.submit') }}</v-btn>
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
import GDatePicker from '../../_components/form_input/GDatePicker.vue';
import GTimePicker from '../../_components/form_input/GTimePicker.vue';
import GImageInput, { imageInitial } from '../../_components/form_input/GImageInput.vue';
import GBackButton from '@components/GBackButton.vue';
import FormModal from '../../_components/FormModal.vue';
import { pushNotif } from '@/helpers';
export default {
  data() {
    return {
      rules: {},
      item: {
        id: null,
        title: '',
        customer: '',
        date: new Date().toISOString().substr(0, 10),
        dateMulti: [],
        time: null,
        location: 0,
        locImage: imageInitial(),
        address: {
          address: '',
          postcode: '',
          phone: '',
        },
        registrant: ''
      },
      formData: {},
      editPage: false,
      submitUrl: '',
      loadingComponent: false,
    };
  },
  methods: {
    async submit() {
      if (this.$refs.meetingForm.validate()) {
        let options = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
        let payload = new FormData();
        payload.append('title', this.item.title);
        payload.append('customer', this.item.customer);
        if (this.item.registrant != null) {
          payload.append('registrant', this.item.registrant);
        }
        payload.append('location', this.item.location);
        payload.append('meeting_date', this.item.date+' '+(this.item.time != null ? this.item.time : '00:00:00'));
        payload.append('postcode', this.item.address.postcode);
        payload.append('address', this.item.address.address);
        payload.append('phone', this.item.address.phone);
        payload.append('location_image_modified', this.item.locImage.isModified ? 1 : 0);
        if (this.item.locImage.file) {
          payload.append('location_image', this.item.locImage.file);
        }
        const res = this.editPage
          ? await update(this.submitUrl, payload, options)
          : await store(this.submitUrl, payload, options);
        if (res) {
          let customer_name = this.formData.customers.find(customer => customer.id == this.item.customer);
          pushNotif(this.$t('general.meeting.createSuccess', {customer: customer_name.name, meeting: this.item.title}), 'success');
          this.$router.push({ name: 'dummy_meetings' });
        }
      }
    },
    // --- for change location text
    // on radio input (filter section), based on language
    getMeetingLocationText(value) {
      let new_text = '';
      switch (value) {
        case 'Internal':
          new_text = this.$t('general.meeting.selectLocation.internal');
          break;
        case 'External':
          new_text = this.$t('general.meeting.selectLocation.external')
          break;
        default:
          new_text = value;
          break;
      }
      return new_text;
    }
    // --- END for change location text
  },
  async created() {
    this.loadingComponent = true;
    const form = await getForm(this.$route.path);
    if (this.$route.meta.editPage) {
      this.editPage = true;
      let { formData, submitUrl, item } = form;
      let meetingDate = new Date(item.meeting_date);
      this.item = {
        ...this.item,
        title: item.title,
        customer: item.customer,
        location: item.location,
        date: [meetingDate.getFullYear(), ("0" + (meetingDate.getMonth() + 1)).slice(-2), ("0" + (meetingDate.getDate())).slice(-2)].join("-"),
        time: [("0" + (meetingDate.getHours())).slice(-2), ("0" + (meetingDate.getMinutes())).slice(-2)].join(":"),
        registrant: item.registrant
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
    GImageInput,
    GTimePicker,
    GBackButton,
    FormModal,
  },
};
</script>
