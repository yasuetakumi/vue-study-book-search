<template>
    <!-- Page container -->
    <PageInnerset :title="$t('general.meeting.list')">
      <v-form ref="dummyMeetingFilter" @submit.prevent="submit" lazy-validation class="px-10 mb-0">
        <FilterReset  @click="resetFilter()"></FilterReset>

        <v-btn large @click.stop="dialogSearchHistory = true" color="" class="ml-5">{{ $t('general.form.searchHistory') }}</v-btn>
        <v-dialog
          v-model="dialogSearchHistory"
          max-width="700"
        >
          <v-card>
            <v-card-title class="text-h5">{{ $t('general.form.searchHistory') }}</v-card-title>
            <hr class="w-100">
            <v-card-text>
              <v-container fluid>
                <v-row v-for="(item, index) in displayedSearchHistory" :key="index">
                  <v-col cols="12" lg="8">
                    <p v-if="item.title" class="mb-0">{{ $t('general.title') }}: {{ item.title }}</p>
                    <p v-if="item.meeting_date_start || item.meeting_date_end" class="mb-0">{{ $t('general.time.date') }}: {{ item.meeting_date_start }} <span v-if="item.meeting_date_start && item.meeting_date_end">-</span> {{ item.meeting_date_end }}</p>
                    <p v-if="item.registrant" class="mb-0">{{ $t('general.meeting.registrant') }}: {{item.registrant }}</p>
                    <p v-if="item.customer" class="mb-0">{{ $t('general.customer') }}: {{ item.customer_text }}</p>
                    <p v-if="item.location_text" class="mb-0">{{ $t('general.meeting.location') }}: {{ getMeetingLocationText(item.location_text) }}</p>
                    
                  </v-col>
                  <v-col  cols="12" lg="4" class="d-flex flex-column justify-center">
                  <v-btn
                    color=""
                    @click="setFilter(item.object)"
                  >
                    {{ $t('general.form.search') }}
                  </v-btn>
                  </v-col>
                  <hr class="w-100">
                </v-row>

                <v-row v-if="displayedSearchHistory.length < 1">
                  <v-col cols="12">{{ $t('general.noDataAvailable') }}</v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color=""
                @click="dialogSearchHistory = false"
              >
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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

            <FilterSelectWithSearch
              :title="$t('general.meeting.registrant')+': '"
              v-model="activeFilters.registrant"
              :items="formData.registrants"
              :option="['display_name', 'display_name']"
            />
          </template>

          <template v-slot:right>
            <FilterSelect
              :title="$t('general.customer')+': '"
              v-model="activeFilters.customer"
              :items="formData.customers"
              :option="['id', 'name']"
            />

            <FilterRadio :title="$t('general.meeting.location') + ': '" v-model="activeFilters.location">
              <v-radio
                v-for="location in formData.locations"
                :key="location.value"
                :label="getMeetingLocationText(location.text)"
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

         <!-- search button -->
          <v-container class="mb-6">
            <v-row>
              <v-col xl="12" lg="12" md="12" sm="12">
                <v-btn large @click="searchFilter()" color="">{{ $t('general.form.search') }}</v-btn>
              </v-col>
            </v-row>
          </v-container>
          <!-- search button -->

        <!-- for filter column -->
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
                max-width="700"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Column Fillter
                  </v-card-title>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col sm="12" md="7" xl="7">
                          <v-text-field
                            label="Search Column Name . . ."
                            v-model="searchNameColumn"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col sm="12" md="5" xl="5" class="d-flex justify-space-between pt-4">
                          <v-btn
                            large
                            color=""
                            @click="displayColumn(true)"
                          >
                            Show All
                          </v-btn>
                          <v-btn
                            large
                            color=""
                            @click="displayColumn(false)"
                          >
                            Hide All
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          v-for="(header, index) in resultSearchNameColumn"
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
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color=""
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
        <!-- for filter column -->

      </v-form>

      <v-data-table
        :headers="headers"
        :items="displayedMeetings"
        :options.sync="options"
        :server-items-length="totalMeetings"
        :loading="loading"
        class="elevation-1"
      >

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
            :cardText="{
              body:
                $t('general.meeting.deleteModal.text', {customer_name: item.customer.name, meeting_date: item.meeting_date})
            }"
            :disabled="loading"
            :onConfirm="deleteMeeting(item.id)"
            :btnClass="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
            color="grey darken-2"
          ></g-action-button>
        </template>
        <template v-slot:item.location="{ item }">
          {{ getMeetingLocationText(item.location) }}
        </template>
      </v-data-table>

    </PageInnerset>
</template>

<script>
import io from 'lodash';
import { mapState } from 'vuex';
import { destroy, getAll } from '@services/crud';
import { convArrToObj } from '@helpers';
import PageInnerset from '../../_components/page/PageInnerset';
import GActionButton from '../../_components/GActionButton.vue';

import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';

import FilterText from '@views/_components/datatable_filter/TableFilterText';
import FilterDateRange from '@views/_components/datatable_filter/TableFilterDateRange';
import FilterSelect from '@views/_components/datatable_filter/TableFilterSelect';
import FilterRadio from '@views/_components/datatable_filter/TableFilterRadio';
// import FilterRange from '@views/_components/datatable_filter/TableFilterSlotRange';
import FilterSelectWithSearch from '@views/_components/datatable_filter/TableFilterSelectWithSearch';

import { pushNotif } from '@/helpers';

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
    PageInnerset,
    GActionButton,
    FilterReset,
    FilterContainer,
    FilterText,
    FilterDateRange,
    FilterSelect,
    FilterRadio,
    // FilterRange,
    FilterSelectWithSearch
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
        customer:'',
        location: '',
        meeting_date_start: '',
        meeting_date_end: '',
        // min_user_count: '',
        // max_user_count: '',
        registrant: ''
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

      // --- for filter column
      searchNameColumn: '',
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
          value: 'customer.name',
          status: true,
        },
        {
          text: this.$t('general.meeting.registrant'),
          value: 'registrant.display_name',
          status: true,
        },
        {
          text: this.$t('general.meeting.location'),
          value: 'location',
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
          sortable: false,
          status: true,
        },
      ],
      selectedHeaders: [],
      // --- END for filter column
      dialogSearchHistory: false,
      searchHistory: [],
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
        // this.updateFilters();
      },
      deep: true,
    },

    // --- for filter column
    currentLocale: function () {
      this.changeTextFromLocal();
    },
    // --- END for filter column

    $route: {
      immediate: true,
      deep: true,
      handler(){
        this.getAllMeetings();
      }
    }
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
        location: meeting.location == null ? '-' : this.keyedFormData.locations[meeting.location].text,
      }));
    },

    displayedSearchHistory() {
      if (this.keyedFormData.locations != undefined) {
        return this.searchHistory.map(history => ({
          ...history,
          customer_text: history.customer === '' ? '' : this.formData.customers.find(obj => {return obj.id == history.customer}).name,
          location_text: (history.location === '') ? '' : this.keyedFormData.locations[history.location].text,
          object: history,
        }));
      }

      return false;
    },
    
    keyedFormData() {
      let obj = {};
      for (const [key, value] of Object.entries(this.formData)) {
        obj[key] = convArrToObj(value);
      }
      return obj;
    },
    // --- for filter column
    resultSearchNameColumn(){
      return this.selectedHeaders.filter((item)=>{
        return item.text.toLowerCase().includes(this.searchNameColumn.toLowerCase());
      });
    },
    ...mapState({
      // for get current locale
		  currentLocale: state => state.global.locale,
	  }),
    // --- END for filter column
  },

  created() {
    this.selectedHeaders = this.headersMap;
    var query = this.$route.query;

    // need to change the data type to int, to make filter selected on input
    if(query.customer) query.customer = Number(query.customer);
    if(query.location) query.location = Number(query.location);

    this.activeFilters = io.assign({}, this.defaultFilters, query );

    this.searchHistory = JSON.parse(localStorage.getItem("searchHistory") || '[]');
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
        let url = 'meetings';
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
        console.log(this.meetings);
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
          let url = `meetings/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllMeetings();
            pushNotif(this.$t('general.meeting.deleteSuccess'), 'success');
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
      this.updateFilters();
      
      // make date on input empty
      this.$refs.datePicker.minDate = '';
      this.$refs.datePicker.maxDate = '';
    },

    searchFilter: function() {
      this.updateFilters();

      //check if filters empty
      if (!Object.values(io.cloneDeep( this.activeFilters )).every(o => (o === null || o == ""))) {
        //set local storage
        this.searchHistory.unshift(io.cloneDeep( this.activeFilters ));
        
        //delete the oldest searchHistory if it's more than 5
        if (this.searchHistory.length > 5) {
          this.searchHistory.pop();
        }

        localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
      }
    },

    setFilter: function(filter) {
      this.activeFilters = io.cloneDeep( filter );
      
      // update date input
      this.$refs.datePicker.minDate = filter.meeting_date_start;
      this.$refs.datePicker.maxDate = filter.meeting_date_end;

      // this.updateFilters();
      this.searchFilter();
      this.dialogSearchHistory = false;
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
            case 'registrant':
              temp.text = this.$t('general.meeting.registrant');
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
    displayColumn: function(type) {
      for (let index = 0; index < this.selectedHeaders.length; index++) {
        this.selectedHeaders[index].status = type;
      }
    },
    // --- END for filter column

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

hr.w-100{
  width: 100%;
}
// -------------------------------------------------------------------------
</style>
