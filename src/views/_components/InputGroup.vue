<template>
  <v-row>
    <v-col lg="2" md="3" sm="12">
      <v-row>
        <strong class="input-title">{{ title }}</strong>
      </v-row>
      <v-row>
        <span class="input-title-label required" v-if="required">
          {{ $t("general.validation.required") }}
        </span>
        <span class="input-title-label optional" v-if="optional">
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

<style lang="scss">
.input-title {
  font-size: 20px;
}
.input-title-label {
  font-size: 11px;
  position: relative;
  padding: 2px 10px;
  border-radius: 10px 15px;
  display: inline-block;
  margin-left: 0px;
  margin-top: 6px;
}
.input-title-label.required {
  color: red;
  border: solid 1px red;
}
.input-title-label.optional {
  color: green;
  border: solid 1px green;
}
</style>
