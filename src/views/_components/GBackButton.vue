

<template>
    <v-container class="ml-6 px-1 my-0 py-0">
        <v-row>
            <v-col cols="12" lg="1">
            <v-btn :to="targetRoute" block text plain class="">
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
    }
  },
};
</script>