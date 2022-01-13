<template>
  <v-sheet>
    <v-form ref="dummyMeetingFilter" @submit.prevent="submit" lazy-validation class="px-10 mb-0">
    <FilterReset  @click="resetFilter()"></FilterReset>

    <FilterContainer>
      <template v-slot:left>
        <FilterText
          :title="$t('general.title')+ ': '"
          :partial="true"
          v-model="activeFilters.title"
        />

        <FilterDateRange
          :title="$t('general.time.date')+'：'"
          ref="datePicker"
          
          :dateStart.sync ="activeFilters.meeting_date_start"
          :dateEnd.sync ="activeFilters.meeting_date_end"
          
          @startInput="(value) => activeFilters.meeting_date_start = value"
          @endInput="(value) => activeFilters.meeting_date_end = value"
        />
      </template>

      <template v-slot:right>
        <FilterSelect
          :title="$t('general.customer')+': '"
          v-model="activeFilters.customer"
          :items="formData.customers"
          :option="['value', 'name']"
        />

        <FilterRadio :title="$t('general.meeting.location') + ': '" v-model="activeFilters.location">
          <v-radio
            v-for="location in formData.locations"
            :key="location.value"
            :label="location.text"
            :value="location.value"
          ></v-radio>
        </FilterRadio>

        <!-- Input filter for from x to y filter (numeric)-->
        <!-- <FilterRange title="title：">
          <template v-slot:min>
            <v-text-field
              v-model.number="activeFilters.min_user_count"
              outlined
              dense
              type="number"
              min="0"
              step="1"
              @input="activeFilters.min_user_count = $event !== '' ? $event : null"
              :rules="activeFilters.max_user_count && activeFilters.min_user_count ? rules.userCountMin.concat(rules.positiveInteger) : []"
            ></v-text-field>
          </template>
          <template v-slot:max>
            <v-text-field
              v-model.number="activeFilters.max_user_count"
              outlined
              dense
              type="number"
              min="0"
              step="1"
              @input="activeFilters.max_user_count = $event !== '' ? $event : null"
              :rules="activeFilters.min_user_count && activeFilters.max_user_count ? rules.userCountMax.concat(rules.positiveInteger) : []"
            ></v-text-field>
          </template>
        </FilterRange> -->

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
import io from 'lodash';
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';

import FilterText from '@views/_components/datatable_filter/TableFilterText';
import FilterDateRange from '@views/_components/datatable_filter/TableFilterDateRange';
import FilterSelect from '@views/_components/datatable_filter/TableFilterSelect';
import FilterRadio from '@views/_components/datatable_filter/TableFilterRadio';
// import FilterRange from '@views/_components/datatable_filter/TableFilterSlotRange';

/**
 * Simple note of separated filter with vue router
 * - code inside $route on watch will be executed when vue route query is changing
 *   ex: http://localhost:3000/dummy-meetings -> http://localhost:3000/dummy-meetings?title=grune
 * 
 * - code inside activeFilters on watch will be executed when user input filter on filter table
 *   updateFilters function on method will be executed for pushing user input filter into vue route
 * 
 * - on the created(), any vue route query will be appended as initial filter input
 *   ex: http://localhost:3000/dummy-meetings?title=grune
 *   then, title input will be filled with grune
 * 
 * - resetFilter function on method will clear all filter input (activeFilters)
 *   because filter is changing, it will automatically run updateFilters function (push empty value of all filter)
 *   then show all record without filtered
 */

export default {
  components: { 
    GActionButton,
    FilterReset,
    FilterContainer,
    FilterText,
    FilterDateRange,
    FilterSelect,
    FilterRadio,
    // FilterRange,
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
      defaultFilters: {
        title: '',
        customer: '',
        attendee: '',
        meeting_date_start: '',
        meeting_date_end: '',
        // min_user_count: '',
        // max_user_count: '',
      },
      // rules: {
      //   userCountMin: [
      //     (v) => (parseInt(v) < parseInt(this.activeFilters.max_user_count) && v !==null) || this.$t('general.validation.lessThan'),
      //   ],
      //   userCountMax: [
      //     (v) => (parseInt(v) > parseInt(this.activeFilters.min_user_count) && v !==null) || this.$t('general.validation.greaterThan'),
      //   ],
      //   positiveInteger: [
      //     (v) => v >= 0 || this.$t('general.validation.positiveInteger')
      //   ]
      // },
    };
  },

  watch: {
    options: {
      handler() {
        this.getAllMeetings();
      },
      deep: true,
    },

    defaultFilters: {
      handler(to){
        console.log(to);
      },
      deep: true,
    },

    activeFilters: {
      handler() {
        this.updateFilters();
      },
      deep: true,
    },

    $route: {
      immediate: true,
      deep: true,
      handler(){
        this.getAllMeetings();
      }
    }
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
          value: 'customer.name',
        },
        {
          text: this.$t('general.meeting.location'),
          value: 'location',
        },
        {
          text: this.$t('general.time.date'),
          value: 'meeting_date',
        },
        {
          text: this.$t('general.meeting.registrant'),
          value: 'registrant.display_name',
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
        location: meeting.location == null ? '-' : this.keyedFormData.locations[meeting.location].text,
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

  created() {
    var query = this.$route.query;

    // need to change the data type to int, to make filter selected on input
    if(query.customer) query.customer = Number(query.customer);
    if(query.attendee) query.attendee = Number(query.attendee);

    this.activeFilters = io.assign({}, this.defaultFilters, query );
  },

  methods: {

    // update and push filter into vue router
    updateFilters: io.throttle( function() {
      const filters = io.cloneDeep( this.activeFilters );
      const keys = Object.keys(filters);

      keys.forEach((key, index) => {
        if(!String(filters[key])) delete filters[key];;
      });

      this.$router.push({  query: filters }).catch( function(e){});
    }, 500),

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

    resetFilter: function() {
      this.$refs.dummyMeetingFilter.reset;
      this.activeFilters = io.cloneDeep( this.defaultFilters );;
      
      // make date on input empty
      this.$refs.datePicker.minDate = '';
      this.$refs.datePicker.maxDate = '';
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
