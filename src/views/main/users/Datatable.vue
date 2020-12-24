<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :options.sync="options"
    :server-items-length="totalUsers"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item.action="{ item }">
      <v-btn
        :disabled="loading"
        color="primary"
        class="mx-2"
        @click="editUser(item.id)"
      >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
      <v-btn
        :disabled="loading"
        color="error"
        class="mx-2"
        @click="deleteUser(item.id)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { destroy, getAll } from "@services/crud";
export default {
  data() {
    return {
      totalUsers: 0,
      users: [],
      loading: true,
      options: {},
      headers: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "User Role",
          value: "user_role_id"
        },
        {
          text: "Name",
          value: "display_name"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Action",
          value: "action"
        }
      ]
    };
  },
  watch: {
    options: {
      handler() {
        console.log(this.options);
        this.getAllUsers();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers: async function() {
      let url = "users";
      this.loading = true;
      const { itemsPerPage, page, sortBy, sortDesc } = this.options;
      const users = await getAll(url, { itemsPerPage, page, sortBy, sortDesc });
      console.log(users);
      this.users = users.data;
      this.totalUsers = users.total;
      this.loading = false;
    },
    deleteUser: async function(id) {
      this.loading = true;
      let url = `users/${id}`;
      const res = await destroy(url);
      if (res) {
        this.getAllUsers();
      }
      this.loading = false;
    },
    editUser: function(id) {
      this.$router.push({ name: "users.edit", params: { id } });
    }
  }
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: bold !important;
  font-size: 18px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
</style>
