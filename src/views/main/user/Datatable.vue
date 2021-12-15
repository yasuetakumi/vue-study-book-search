<template>
  <div class="">
    <v-container
      fluid
      class="grey lighten-5 mb-6"
    >
      <v-row
        no-gutters
        justify="space-between"
      >
        <v-col
          xl="8"
          lg="8"
          md="8"
          sm="12"
        >
        </v-col>
        <v-col
          xl="4"
          lg="4"
          md="4"
          sm="12"
        >
          <v-btn
            depressed
            color="primary"
            @click.stop="dialogColumnFilter = true"
          >
            Primary
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
                      v-for="(collumn, index) in headers"
                      :key="index"
                      xl="4"
                      lg="4"
                      md="3"
                    >
                      <v-btn
                        class=""
                        block
                        outlined
                        color="indigo"
                        @click="addColumn(index)"
                      >
                        {{ collumn.text }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              <v-card-text>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary"
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
    <v-data-table
      :headers="showHeaders"
      :items="displayedUsers"
      :options.sync="options"
      :server-items-length="totalUsers"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:body.prepend>
        <tr>
          <td></td>
          <td>
            <v-select
              clearable
              :items="formData.userRoles"
              item-text="label"
              item-value="id"
              v-model="activeFilters.userRole"
            >
            </v-select>
          </td>
          <td>
            <v-text-field v-model="activeFilters.name"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.email"></v-text-field>
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
          @click="editUser(item.id)"
        >
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteUser(item.id)"
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

export default {
  components: { GActionButton },
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
      // for dialog filter column
      dialogColumnFilter: false,
      headers: [],
      headersMap: {
        id: {text: 'ID', value: 'id', },
        role: {text: this.$t('general.role.role'), value: 'user_role', },
        fullName: {text: this.$t('general.user.fullName'), value: 'display_name', },
        email: {text: this.$t('general.auth.email'), value: 'email', },
        action: {text: this.$t('general.crud.action'), value: 'action', },
      },
      selectedHeaders: []
    };
  },
  created () {
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  computed: {
    // headers() {
    //   return [
    //     {
    //       text: 'ID',
    //       value: 'id',
    //     },
    //     {
    //       text: this.$t('general.role.role'),
    //       value: 'user_role',
    //     },
    //     {
    //       text: this.$t('general.user.fullName'),
    //       value: 'display_name',
    //     },
    //     {
    //       text: this.$t('general.auth.email'),
    //       value: 'email',
    //     },
    //     {
    //       text: this.$t('general.crud.action'),
    //       value: 'action',
    //     },
    //   ]
    // },
    displayedUsers() {
      return this.users.map(user => ({
        ...user,
        user_role: this.keyedFormData.userRoles[user.user_role_id].label,
      }));
    },
    keyedFormData() {
      let obj = {};
      for (const [key, value] of Object.entries(this.formData)) {
        obj[key] = convArrToObj(value, 'id');
      }
      return obj;
    },
    showHeaders () {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    },
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
    addColumn: function(index) {
      console.log(index)
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
