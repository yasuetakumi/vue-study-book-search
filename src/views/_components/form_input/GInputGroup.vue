<template>
  <v-row class="center">
    <v-col lg="2" md="3" sm="12" cols="12" class="title-wrapper">
        <strong class="input-title">{{ title }}</strong>
        <br/>
        <span class="input-title-label required" v-if="required">
          {{ $t('general.validation.required') }}
        </span>
        <span class="input-title-label optional" v-if="optional">
          {{ $t('general.validation.optional') }}
        </span>
    </v-col>
    <v-col lg="10" md="9" sm="12" cols="12">
      <slot></slot>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    title: {
      required: false,
    },
    required: Boolean,
    optional: Boolean,
  },
};
</script>

<style lang="scss">
.title-wrapper {
  margin-top:-25px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-title {
  font-size: 14px;
}
.input-title-label {
  font-size: 10px;
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
.v-input__control {
    font-size: 14px;
}
</style>
