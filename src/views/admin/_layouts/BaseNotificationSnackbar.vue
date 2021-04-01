<template>
  <v-snackbar right top v-model="notification.isOpen" :color="notification.color" :multi-line="notification.multiLine">
    <span class="font-weight-bold text-subtitle-1">
      {{ notification.text }}
    </span>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="$store.commit('global/closeNotification')">
        <v-icon dark>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    notification: state => state.global.notification,
  }),
};
</script>
