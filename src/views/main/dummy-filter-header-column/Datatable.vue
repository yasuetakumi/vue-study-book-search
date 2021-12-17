<template>
  <div class="">
    <!--for filter column -->
    <v-container fluid class="grey lighten-5 mb-6">
      <v-row no-gutters justify="space-between">
        <v-col xl="12" lg="12" md="12" sm="12">
          <v-btn
            depressed
            color="primary"
            @click.stop="dialogColumnFilter = true"
            class="float-none float-sm-right"
          >
            Filter Column
          </v-btn>
          <v-dialog
            v-model="dialogColumnFilter"
            max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                Column Fillter
              </v-card-title>
                <v-container fluid>
                  <v-row>
                    <v-col
                      v-for="(header, index) in selectedHeaders"
                      :key="index"
                      xl="4"
                      lg="4"
                      md="3"
                    >
                      <v-btn
                        class=""
                        block
                        :outlined="!header.status"
                        color="cyan"
                        dark
                        @click="filterColumn(header)"
                      >
                        {{ header.text }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              <v-card-text>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="error"
                  @click="dialogColumnFilter = false"
                >
                  close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <!-- END for filter column -->
    <v-data-table
      :headers="headers"
      :items="displayedMeetings"
      :options.sync="options"
      :server-items-length="totalMeetings"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:body.prepend>
        <tr>
          <!-- add v-show="isEnabledColumn for filter column -->
          <td v-show="isEnabledColumn('title')">
            <v-text-field v-model="activeFilters.title"></v-text-field>
          </td>
          <td v-show="isEnabledColumn('customer')">
            <v-select clearable :items="formData.customers" v-model="activeFilters.customer"> </v-select>
          </td>
          <td v-show="isEnabledColumn('attendee')">
            <v-select clearable :items="formData.attendees" v-model="activeFilters.attendee"> </v-select>
          </td>
          <td v-show="isEnabledColumn('action')" colspan="4"></td>
          <!-- END add v-show="isEnabledColumn for filter column -->
        </tr>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          small
          :class="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
          @click="editMeeting(item.id)"
        >
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteMeeting(item.id)"
          :btnClass="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
          color="grey darken-2"
        ></g-action-button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';
import { mapState } from 'vuex'

export default {
  components: { GActionButton },
  data() {
    return {
      formData: {},
      totalMeetings: 0,
      meetings: [],
      loading: true,
      options: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 10,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: [],
      },
      activeFilters: {},
      // --- for filter column
      dialogColumnFilter: false,
      // init table header
      headersMap: [
        {
          text: this.$t('general.title'),
          value: 'title',
          status: true,
        },
        {
          text: this.$t('general.customer'),
          value: 'customer',
          status: true,
        },
        {
          text: this.$t('general.attendee'),
          value: 'attendee',
          status: true,
        },
        {
          text: this.$t('general.time.date'),
          value: 'meeting_date',
          status: true,
        },
        {
          text: this.$t('general.crud.action'),
          value: 'action',
          status: true,
        },
      ],
      selectedHeaders: [],
      // --- END for filter column
    };
  },
  created () {
    this.selectedHeaders = this.headersMap;
  },
  watch: {
    options: {
      handler() {
        this.getAllMeetings();
      },
      deep: true,
    },
    activeFilters: {
      handler() {
        this.getAllMeetings();
      },
      deep: true,
    },
    // --- for filter column
    currentLocale: function () {
      this.changeTextFromLocal();
    },
    // --- END for filter column
  },
  computed: {
    // --- changefor filter column
    headers: {
      // getter
      get: function () {
        return this.selectedHeaders.filter(s => s.status == true);
      },
      // setter
      set: function () {
        // 
      }
    },
    // --- END changefor filter column
    displayedMeetings() {
      return this.meetings.map(meeting => ({
        ...meeting,
        customer: this.keyedFormData.customers[meeting.customer].text,
        attendee: this.keyedFormData.attendees[meeting.attendee].text,
      }));
    },
    keyedFormData() {
      let obj = {};
      for (const [key, value] of Object.entries(this.formData)) {
        obj[key] = convArrToObj(value);
      }
      return obj;
    },
    // --- for filter column
    ...mapState({
      // for get current locale
		  currentLocale: state => state.global.locale,
	  }),
    // --- END for filter column
  },
  mounted() {
    this.getAllMeetings();
  },
  methods: {
    getAllMeetings: async function() {
      try {
        let url = 'dummy-meetings';
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters,
        });
        this.meetings = res.meetings.data;
        this.totalMeetings = res.meetings.total;
        this.formData = res.formData;
      } catch (err) {
        if (err.isHandled) {
          // Do nothing
        }
      } finally {
        this.loading = false;
      }
    },
    deleteMeeting: function(id) {
      let cb = async function() {
        this.loading = true;
        try {
          let url = `dummy-meetings/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllMeetings();
          }
        } catch (err) {
          if (err.isHandled) {
            // Do nothing
          }
        } finally {
          this.loading = false;
        }
      };
      return cb.bind(this);
    },
    editMeeting: function(id) {
      this.$router.push({ name: 'dummy_meetings.edit', params: { id } });
    },
    // --- for filter column
    filterColumn: function(data) {
      // find index data
      let index = this.selectedHeaders.findIndex((obj => obj.value == data.value));
      // change status
      this.selectedHeaders[index].status = !data.status;
      // change headers, only shows if status == true
      this.headers = this.selectedHeaders.filter(function(value){ 
        return value.status == true;
      });
    },
    // for hide select filter if table header is hidden
    isEnabledColumn: function(value) {
      let obj_selectedHeaders = this.selectedHeaders.find(obj => obj.value == value);
      return obj_selectedHeaders.status;
    },
    // for change word based on local (on table header and dialog filter column)
    changeTextFromLocal: function() {
      this.selectedHeaders = this.selectedHeaders.map(obj => {
        // temporary object
        var temp = Object.assign({}, obj);
        if(temp.value != 'id') {
          switch (temp.value) {
            case 'title':
              temp.text = this.$t('general.title');
              break;
            case 'customer':
              temp.text = this.$t('general.customer');
              break;
            case 'attendee':
              temp.text = this.$t('general.attendee');
              break;
            case 'meeting_date':
              temp.text = this.$t('general.time.date');
              break;
            case 'action':
              temp.text = this.$t('general.crud.action');
              break;
            default:
              console.log('no data');
          }
        }
        return temp;
      });
    },
    // --- END for filter column
  },
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: bold !important;
  font-size: 18px !important;
  white-space: nowrap;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
</style>
