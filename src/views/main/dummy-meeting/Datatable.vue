<template>
  <v-data-table
    :headers="headers"
    :items="displayedMeetings"
    :options.sync="options"
    :server-items-length="totalMeetings"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:body.prepend>
      <tr class="sm-hide">
        <td>
          <v-text-field v-model="activeFilters.title"></v-text-field>
        </td>
        <td>
          <v-select clearable :items="formData.customers" v-model="activeFilters.customer"> </v-select>
        </td>
        <td>
          <v-select clearable :items="formData.attendees" v-model="activeFilters.attendee"> </v-select>
        </td>
        <td colspan="4"></td>
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
</template>

<script>
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

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
    };
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
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('general.title'),
          value: 'title',
        },
        {
          text: this.$t('general.customer'),
          value: 'customer',
        },
        {
          text: this.$t('general.attendee'),
          value: 'attendee',
        },
        {
          text: this.$t('general.time.date'),
          value: 'meeting_date',
        },
        {
          text: this.$t('general.crud.action'),
          value: 'action',
        },
      ];
    },
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

// -------------------------------------------------------------------------
// SP custom layout
// Please add <tr class="sm-hide"> at custom filter to avoid broken on SP layout
// -------------------------------------------------------------------------
.v-data-table > .v-data-table__wrapper > table > tbody > tr.sm-hide {
  @media screen and (max-width: 600px) {
    display: none;
  }
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td.v-data-table__mobile-row > div {
  @media screen and (max-width: 600px) {
    width: 50% !important;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
}
// -------------------------------------------------------------------------
</style>
