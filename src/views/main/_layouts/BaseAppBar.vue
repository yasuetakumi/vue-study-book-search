<template>
  <v-app-bar flat app>
    <v-btn icon @click="toggleDrawer(!drawerOpen)">
      <v-icon>
        {{ drawerOpen ? 'mdi-chevron-left' : 'mdi-menu' }}
      </v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-menu offset-y class="mx-3">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :elevation="1" small v-bind="attrs" v-on="on">
          {{ $t('localeLabel') }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-for="locale in languages" :key="locale.val" @click="setLocale(locale.val)">
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
        <v-list-item v-for="menu in accountMenus" :key="menu.id" @click="menu.action">
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
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      accountMenus: [
        {
          id: 'logout',
          title: 'general.auth.logout',
          icon: 'mdi-logout',
          action: () => {
            this.$store.dispatch('auth/logout');
          },
        },
      ],
    };
  },
  computed: {
    ...mapState({
      locale: store => store.global.locale,
      languages: store => store.global.languages,
    }),
    drawerOpen() {
      return this.value;
    },
  },
  methods: {
    ...mapActions({
      setLocale: 'global/setLocale',
    }),
    toggleDrawer(val) {
      this.$emit('input', val);
    },
  },
  created() {},
};
</script>
