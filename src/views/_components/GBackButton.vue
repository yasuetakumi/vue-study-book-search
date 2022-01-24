<template>
  <v-container :class="[$vuetify.breakpoint.mdAndDown ? 'pl-2' : 'pl-10', 'my-0 py-0']">
    <v-row>
      <v-col cols="12" lg="1">
        <v-btn class="back-btn" :to="targetRoute" block text plain>
          <v-icon left>
            mdi-keyboard-backspace
          </v-icon>
          {{ $t('general.action.backToList') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    targetRoute: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss">
.back-btn > span {
  margin-bottom: 15px;
}
// -------------------------------------------------------------------------
// SP custom layout
// -------------------------------------------------------------------------
@media screen and (max-width: 600px) {
  .back-btn > span {
    display: block !important;
    text-align: left;
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
// -------------------------------------------------------------------------
</style>
