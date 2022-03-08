<template>
  <div>
    <!-- Breadcrumbs -->
    <p class="mx-1 text-subtitle-2 text--secondary">
      <router-link :to="{ name: 'dashboard' }">{{ $t('general.nav.dashboard') }}</router-link>
      <span class="mx-2">></span>
      <span>{{ $t('general.user.list') }}</span>
    </p>

    <!-- Page container -->
    <PageInnerset :title="$t('general.user.list')">
      <!-- filter section -->
      <v-form ref="userListFilter" @submit.prevent="submit" lazy-validation class="px-10 mb-0">
        <FilterReset  @click="resetFilter()"></FilterReset>

        <FilterContainer>
          <template v-slot:left>
            <FilterSelect
              :title="$t('general.role.role')+': '"
              v-model="activeFilters.userRole"
              :items="formData.userRoles"
              :option="['id', 'label']"
            />
            <FilterText
              :title="$t('general.user.fullName')+ ': '"
              :partial="true"
              v-model="activeFilters.name"
            />
          </template>

          <template v-slot:right>
            <FilterText
              :title="$t('general.auth.email')+ ': '"
              :partial="true"
              v-model="activeFilters.email"
            />
          </template>
        </FilterContainer>

      </v-form>
      <!-- END filter section -->

      <!-- searching form -->
      <v-row class="d-flex justify-end px-2">
        <!-- filter column -->
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          medium
          class="mx-1 my-1 white--text"
          @click.stop="dialogColumnFilter = true"
        >
          <v-icon>mdi-download</v-icon> {{ $t('general.action.filterColumn') }}
        </v-btn>
        <v-dialog v-model="dialogColumnFilter" max-width="700">
          <v-card>
            <v-card-title class="text-h5">
              Column Fillter
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col sm="12" md="7" xl="7">
                    <v-text-field label="Search Column Name . . ." v-model="searchNameColumn" solo></v-text-field>
                  </v-col>
                  <v-col sm="12" md="5" xl="5" class="d-flex justify-space-between pt-4">
                    <v-btn large color="" @click="displayColumn(true)">
                      Show All
                    </v-btn>
                    <v-btn large color="" @click="displayColumn(false)">
                      Hide All
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col v-for="(header, index) in resultSearchNameColumn" :key="index" xl="4" lg="4" md="3">
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

              <v-btn color="" @click="dialogColumnFilter = false">
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- END filter column -->

        <!-- download CSV -->
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          medium
          class="mx-1 my-1 white--text"
          @click="downloadCSV()"
        >
          <v-icon>mdi-download</v-icon> {{ $t('general.action.csvDownload') }}
        </v-btn>
        <!-- END download CSV -->

        <!-- import CSV -->
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          medium
          class="mx-1 my-1 white--text"
          @click.stop="importDialog = true"
        >
          <!-- <v-icon>mdi-upload</v-icon> {{ $t('general.action.csvDownload') }} -->
          <v-icon>mdi-upload</v-icon> {{ $t('general.action.importUser') }}
        </v-btn>
        <v-dialog
          v-model="importDialog"
          max-width="500"
        >
          <v-card>
            <v-card-title class="text-h5">
              Import User
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-file-input
                      v-model="files"
                      placeholder="Upload your documents"
                      label="File input"
                      prepend-icon="mdi-paperclip"
                      outlined
                      dense
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                depressed
                @click="importUser()"
              >
                Import
              </v-btn>
              <v-btn
                @click="importDialog = false"
              >
                close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- END import CSV -->
      </v-row>

      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="displayedUsers"
        :options.sync="options"
        :server-items-length="totalUsers"
        :loading="loading"
        class="elevation-1 mt-5"
      >
        <template v-slot:item.action="{ item }">
          <v-btn
            id="edit"
            :disabled="loading"
            color="cyan darken-2"
            small
            :class="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
            @click="editUser(item.id)"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
          <g-action-button
            :cardText="{
              body:
                $t('general.user.deleteModal.text', {name: item.display_name})
            }"
            :disabled="loading"
            :onConfirm="deleteUser(item.id)"
            :btnClass="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
            color="grey darken-2"
          ></g-action-button>
        </template>
      </v-data-table>
    </PageInnerset>
  </div>
</template>

<script>
import io from 'lodash';
import { mapState } from 'vuex';

import { destroy, getAll, download, importCsv } from '@services/crud';
import { convArrToObj } from '@helpers';

import PageInnerset from '../../_components/page/PageInnerset';
import GActionButton from '../../_components/GActionButton.vue';
import { pushNotif } from '@/helpers';

// --- components for filter section
import FilterReset from '@views/_components/datatable_filter/TableFilterReset';
import FilterContainer from '@views/_components/datatable_filter/TableFilterContainer';
import FilterText from '@views/_components/datatable_filter/TableFilterText';
import FilterSelect from '@views/_components/datatable_filter/TableFilterSelect';
// --- END components for filter section

export default {
  components: { 
    GActionButton, 
    PageInnerset,
    FilterReset,
    FilterContainer,
    FilterText,
    FilterSelect,
  },
  data() {
    return {
      arrBtn: [
        'Filter Column',
        'Download CSV',
        'Import User'
      ],
      formData: {},
      totalUsers: 0,
      users: [],
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

      // --- for filter section
      activeFilters: {},
      defaultFilters: {
        userRoles: '',
        name: '',
        email: '',
      },
      // --- END for filter section

      // --- for filter column
      searchNameColumn: '',
      dialogColumnFilter: false,
      // init table header
      headersMap: [
        {
          text: 'ID',
          value: 'id',
          status: true,
        },
        {
          text: this.$t('general.role.role'),
          value: 'user_role_name',
          sortable: true,
          status: true,
        },
        {
          text: this.$t('general.user.fullName'),
          value: 'display_name',
          sortable: true,
          status: true,
        },
        {
          text: this.$t('general.auth.email'),
          value: 'email',
          sortable: true,
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
      // --- for import csv
      importDialog: false,
      files: null,
      // --- END for import csvt
    };
  },
  computed: {
    // --- changefor filter column
    headers: {
      // getter
      get: function() {
        return this.selectedHeaders.filter(s => s.status == true);
      },
      // setter
      set: function() {
        //
      },
    },
    // --- END changefor filter column
    displayedUsers() {
      return this.users.map(user => ({
        ...user,
        user_roles: this.keyedFormData.userRoles[user.user_role_id],
      }));
    },
    keyedFormData() {
      let obj = {};
      for (const [key, value] of Object.entries(this.formData)) {
        obj[key] = convArrToObj(value, 'id');
      }
      return obj;
    },
    // --- for filter column
    resultSearchNameColumn() {
      return this.selectedHeaders.filter(item => {
        return item.text.toLowerCase().includes(this.searchNameColumn.toLowerCase());
      });
    },
    ...mapState({
      // for get current locale
      currentLocale: state => state.global.locale,
    }),
    // --- END for filter column
  },
  watch: {
    options: {
      handler() {
        this.getAllUsers();
      },
      deep: true,
    },
    activeFilters: {
      handler() {
        this.getAllUsers();
      },
      deep: true,
    },
    // --- for filter column
    currentLocale: function() {
      this.changeTextFromLocal();
    },
    // --- END for filter column
  },
  created() {
    this.selectedHeaders = this.headersMap;
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers: async function() {
      try {
        let url = 'users';
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters,
        });
        this.users = res.users.data;
        this.totalUsers = res.users.total;
        this.formData = res.formData;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    deleteUser: function(id) {
      let cb = async function() {
        try {
          this.loading = true;
          let url = `users/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllUsers();
            pushNotif(this.$t('general.user.deleteSuccess'), 'success');
          }
        } catch (err) {
          if (err.isHandled) {
            //
          }
        } finally {
          this.loading = false;
        }
      };

      return cb.bind(this);
    },
    editUser: function(id) {
      this.$router.push({ name: 'users.edit', params: { id } });
    },
    downloadCSV: async function() {
      try {
        let url = 'users/downloadCSV';
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await download(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters,
        });

        const urls = URL.createObjectURL(
          new Blob([res.data], {
            type: 'application/vnd.ms-excel',
          })
        );
        const link = document.createElement('a');
        link.href = urls;
        link.setAttribute('download', 'user_list.csv');
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    resetFilter: function() {
      this.$refs.userListFilter.reset;
      this.activeFilters = io.cloneDeep( this.defaultFilters );
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
            case 'user_role_name':
              temp.text = this.$t('general.role.role');
              break;
            case 'display_name':
              temp.text = this.$t('general.user.fullName');
              break;
            case 'email':
              temp.text = this.$t('general.auth.email');
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
    async importUser() {
      try {
        let url = 'users/import-csv';
        let formData = new FormData();
        formData.append('file', this.files);
        formData.append('type', 'create');
        this.loading = true;
        const res = await importCsv(url, formData);
        if (res) {
          this.importDialog = false;
          this.getAllUsers();
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
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
