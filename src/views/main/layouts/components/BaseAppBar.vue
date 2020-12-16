<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
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
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      accountMenus: store => store.global.accountMenus,
      locale: store => store.global.locale,
      languages: store => store.global.languages
    })
  },
  methods: {
    ...mapActions({
      setLocale: "global/setLocale"
    }),
    ...mapMutations({
      toggleDrawer: "global/toggleDrawer"
    })
  },
  created() {}
};
</script>
