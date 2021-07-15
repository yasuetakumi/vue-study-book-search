<template>
  <v-sheet>
    <v-form ref="teamFilter" @submit.prevent="" lazy-validation>
    <FilterReset  @click="()=>{}"></FilterReset>

    <FilterContainer>
      <template v-slot:left>
        <FilterText
          :title="$t('general.title')+ ': '"
          :partial="true"
          v-model="filter.name"
        />

        <FilterDateRange
          :title="$t('general.time.date')+'：'"
          ref="datePicker"
          v-model="filter.meeting_date"
        />
      </template>

      <template v-slot:right>
        <FilterSelect
          :title="$t('general.customer')+': '"
          v-model="filter.customer"
          :items="formData.customers"
          :option="['value', 'text']"
        />

        <FilterRadio :title="$t('general.attendee') + ': '" v-model="filter.attendee">
          <v-radio
            v-for="attendee in formData.attendees"
            :key="attendee.value"
            :label="attendee.text"
            :value="attendee.value"
          ></v-radio>
        </FilterRadio>
      </template>
    </FilterContainer>

    </v-form>

    <v-data-table
      :headers="headers"
      :items="displayedMeetings"
      :options.sync="options"
      :server-items-length="totalMeetings"
      :loading="loading"
      class="elevation-1"
    >
      <!-- <template v-slot:body.prepend>
        <tr>
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
      </template> -->
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
  </v-sheet>
</template>

<script>
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';

import FilterText from '@views/_components/datatable_filter/TableFilterText';
import FilterDateRange from '@views/_components/datatable_filter/TableFilterDateRange';
import FilterSelect from '@views/_components/datatable_filter/TableFilterSelect';
import FilterRadio from '@views/_components/datatable_filter/TableFilterRadio';

export default {
  components: { 
    GActionButton,
    FilterReset,
    FilterContainer,
    FilterText,
    FilterDateRange,
    FilterSelect,
    FilterRadio
  },
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
      filter: {
        name: null,
        customer: null,
        attendee: null,
        meeting_date: [null, null]
      },
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
    headers(){
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
      ]
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
        console.log(res);
        console.log(this.$route);
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
</style>
