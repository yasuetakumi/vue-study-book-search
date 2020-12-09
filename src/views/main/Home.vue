<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ $t("general.nav.projectName") }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t("general.nav.grune") }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group v-model="activeNavMenu">
          <v-list-item
            v-for="menu in navLeftMenus"
            :key="menu.title"
            :value="menu.route"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ $t(menu.label) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :elevation="1" small v-bind="attrs" v-on="on">
            {{ $t("localeLabel") }}
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="locale in languages"
            :key="locale.val"
            @click="setLocale(locale.val)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ locale.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab :elevation="1" small v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="menu in accountMenus"
            :key="menu.id"
            @click="menu.action"
          >
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t(menu.title) }}</v-list-item-title>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    activeNavMenu: {
      get() {
        return this.$store.state.global.activeNavMenu;
      },
      set(route) {
        if (this.$router.currentRoute.name !== route.name) {
          console.log(route.name);
          this.$router.push({ name: route });
        }
        this.$store.commit("global/setActiveNavMenu", route);
      }
    },
    ...mapState({
      accountMenus: store => store.global.accountMenus,
      locale: store => store.global.locale,
      languages: store => store.global.languages,
      navLeftMenus: store => store.global.navLeftMenus
    })
  },
  methods: {
    ...mapActions({
      setLocale: "global/setLocale"
    })
    // goTo(route) {
    //   if (this.$router.currentRoute.name !== route.name) {
    //     console.log(route.name);
    //     this.$router.push(route);
    //   }
    // }
  },
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
