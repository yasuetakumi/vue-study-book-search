<template>
  <div>

    <!-- Breadcrumbs -->
    <p class="mx-1 text-subtitle-2 text--secondary">
      <router-link :to="{ name: 'dashboard' }">{{$t("general.nav.dashboard")}}</router-link>
      <span class="mx-2">></span>
      <span>{{$t("general.user.list")}}</span>
    </p>

    <!-- Page container -->
    <PageInnerset :title="$t('general.user.list')">

      <!-- searching form -->
      <v-form ref="filter">

        <v-row class="align-items-center">
          <v-col :cols="$vuetify.breakpoint.mdAndDown ? '12' : '4'">
            <span class="text text--secondary">{{ $t('general.role.role') }} : </span>
            <v-select
              clearable
              :items="formData.userRoles"
              item-text="label"
              item-value="id"
              v-model="activeFilters.userRole"
            >
            </v-select>
          </v-col>

          <v-col :cols="$vuetify.breakpoint.mdAndDown ? '12' : '4'">
            <span class="text text--secondary">{{ $t('general.user.name') }} : </span>
            <v-text-field v-model="activeFilters.name"></v-text-field>
          </v-col>

          <v-col :cols="$vuetify.breakpoint.mdAndDown ? '12' : '4'">
          </v-col>
        </v-row>

        <v-row class="align-items-center">
          <v-col :cols="$vuetify.breakpoint.mdAndDown ? '12' : '4'">
            <span class="text text--secondary">{{ $t('general.auth.email') }} : </span>
            <v-text-field v-model="activeFilters.email"></v-text-field>
          </v-col>
        </v-row>


        <!-- searching form button -->
        <v-row class="align-items-center">
          <v-col cols="4">
          </v-col>
          <v-col cols="4">
          </v-col>
          <v-col :cols="$vuetify.breakpoint.mdAndDown ? '12' : '4'" class="d-flex justify-end">
            <v-btn
              :disabled="loading"
              color="cyan darken-2"
              medium
              :class="[$vuetify.breakpoint.mdAndDown ? 'my-1' : '', 'mr-4 white--text float-left']"
              @click="search()"
            >
              <v-icon>mdi-magnify</v-icon> {{ $t('general.action.search') }}
            </v-btn>
            <v-btn
              :disabled="loading"
              color="cyan darken-2"
              medium
              :class="[$vuetify.breakpoint.mdAndDown ? 'my-1' : '', 'white--text float-right']"
              @click="downloadCSV()"
            >
              <v-icon>mdi-download</v-icon> {{ $t('general.action.csvDownload') }}
            </v-btn>
            
          </v-col>
        </v-row>

      </v-form>


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
            :disabled="loading"
            color="cyan darken-2"
            small
            :class="[$vuetify.breakpoint.lgAndDown ? 'my-1' : '', 'mx-2 white--text']"
            @click="editUser(item.id)"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
          <g-action-button
            :valueText="item.display_name"
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
import PageInnerset from '../../_components/page/PageInnerset';

import { destroy, getAll, download } from '@services/crud';
import { convArrToObj } from '@helpers';
import GActionButton from '../../_components/GActionButton.vue';

export default {
  components: { GActionButton , PageInnerset},
  data() {
    return {
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
      activeFilters: {},
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'ID',
          value: 'id',
        },
        {
          text: this.$t('general.role.role'),
          value: 'user_roles.label',
          sortable: true,
        },
        {
          text: this.$t('general.user.fullName'),
          value: 'display_name',
          sortable: true,
        },
        {
          text: this.$t('general.auth.email'),
          value: 'email',
          sortable: true,
        },
        {
          text: this.$t('general.crud.action'),
          value: 'action',
          sortable: false,
        },
      ];
    },
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
  },
  watch: {
    options: {
      handler() {
        this.getAllUsers();
      },
      deep: true,
    },
    'activeFilters.userRole': {
      handler() {
        this.getAllUsers();
      },
      deep: true,
    },
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
          ...this.activeFilters
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
          ...this.activeFilters
        }); 
        
        const urls = URL.createObjectURL(new Blob([res.data], {
          type: 'application/vnd.ms-excel'
        }));
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
    search: function(){
      this.getAllUsers();
    }
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
