<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Vue Starter Kit
          </v-list-item-title>
          <v-list-item-subtitle>
            Grune
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab :elevation="1" small v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            v-for="(menu, index) in accountMenus"
            :key="index"
            @click="menu.action"
          >
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
      <v-footer class="footer">
        <v-col class="text-center" cols="12">
          <strong>Copyright {{ new Date().getFullYear() }} Grune.</strong> All
          rights reserved.
        </v-col>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      // accountMenus: [
      //   {
      //     title: "Logout",
      //     icon: "mdi-logout",
      //     action: async () => {
      //       let loginApi = process.env.VUE_APP_API_DOMAIN + "/api/logout";
      //       try {
      //         const res = await this.axios.get(loginApi);
      //         if (res.status) {
      //           this.$router.push({ name: "login" });
      //         } else {
      //           // show error
      //         }
      //         console.log(res.data);
      //       } catch (err) {
      //         console.log(err);
      //       }
      //     }
      //   }
      // ],
      langugages: [
        { title: "English", icon: "mdi-logout", action: "random" },
        { title: "Japanese", icon: "mdi-logout", action: "random" }
      ],
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "Users", icon: "mdi-account-group-outline" }
      ],
      mini: true
    };
  },
  computed: mapState({
    accountMenus: store => store.global.accountMenus
  }),
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0%;
  width: 100%;
}
</style>
