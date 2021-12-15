<template>
  <v-data-table
    :headers="headers"
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
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dark
          @click.stop="importDialog = true"
        >
          Import
        </v-btn>
        <v-dialog
          v-model="importDialog"
          max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5">Import Users</v-card-title>
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
                @click="importDialog = false"
              >
                Import
              </v-btn>
              <v-btn
                depressed
                @click="importDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
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
</template>

<script>
import { destroy, getAll, importCsv } from '@services/crud';
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
      // --- for import csv
      importDialog: false,
      files: null,
      // --- END for import csvt
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
          value: 'user_role',
        },
        {
          text: this.$t('general.user.fullName'),
          value: 'display_name',
        },
        {
          text: this.$t('general.auth.email'),
          value: 'email',
        },
        {
          text: this.$t('general.crud.action'),
          value: 'action',
        },
      ];
    },
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
</style>
