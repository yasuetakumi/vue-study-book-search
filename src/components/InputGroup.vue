<template>
  <v-row>
    <v-col lg="2" md="3" sm="12">
      <v-row>
        <strong class="text-h5">{{ title }}</strong>
      </v-row>
      <v-row>
        <span class="text-caption" v-if="required">
          {{ $t("general.validation.required") }}
        </span>
        <span class="text-caption" v-if="optional">
          {{ $t("general.validation.optional") }}
        </span>
      </v-row>
    </v-col>
    <v-col lg="10" md="9" sm="12">
      <slot></slot>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    title: {
      required: true
    },
    required: Boolean,
    optional: Boolean
  }
};
</script>
