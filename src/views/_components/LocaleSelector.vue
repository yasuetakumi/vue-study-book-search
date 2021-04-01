<template>
  <v-container>
    <v-select :items="languages" item-text="label" item-value="val" v-model="locale" solo> </v-select>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    locale: {
      get() {
        return this.$store.state.global.locale;
      },
      set(val) {
        this.$store.dispatch('global/setLocale', val);
      },
    },
    ...mapState({
      languages: state => state.global.languages,
    }),
  },
};
</script>
