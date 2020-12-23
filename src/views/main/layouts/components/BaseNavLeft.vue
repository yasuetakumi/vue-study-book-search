<template>
  <v-navigation-drawer v-model="drawerOpen" app>
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
</template>

<script>
import { mapState } from "vuex";
export default {
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
    drawerOpen: {
      get() {
        return this.$store.state.global.drawerOpen;
      },
      set(drawer) {
        this.$store.commit("global/toggleDrawer", drawer);
      }
    },
    ...mapState({
      navLeftMenus: store => store.global.navLeftMenus
    })
  },
  created() {}
};
</script>
