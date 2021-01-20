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
//reusable tool
let convArrToObj = function(arr, keyBy = "value") {
  return arr.reduce(function(obj, next) {
    let { [keyBy]: index, ...rest } = next;
    obj[index] = rest;
    return obj;
  }, {});
};
import { destroy, getAll } from "@services/crud";
export default {
  data() {
    return {
      formData: {},
      totalUsers: 0,
      users: [],
      loading: true,
      options: {},
      activeFilters: {},
      headers: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "User Role",
          value: "user_role"
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
  computed: {
    displayedUsers() {
      return this.users.map(user => ({
        ...user,
        user_role: this.keyedFormData.userRoles[user.user_role_id].label
      }));
    },
    keyedFormData() {
      let obj = {};
      for (const [key, value] of Object.entries(this.formData)) {
        obj[key] = convArrToObj(value, "id");
      }
      return obj;
    }
  },
  watch: {
    options: {
      handler() {
        console.log(this.options);
        this.getAllUsers();
      },
      deep: true
    },
    activeFilters: {
      handler() {
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
      const res = await getAll(url, {
        itemsPerPage,
        page,
        sortBy,
        sortDesc,
        ...this.activeFilters
      });
      console.log(res);
      this.users = res.users.data;
      this.totalUsers = res.users.total;
      this.formData = res.formData;
      console.log(this.keyedFormData);
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
