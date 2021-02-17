<template>
  <v-text-field
    v-bind="$attrs"
    v-model="password"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
  ></v-text-field>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
  },
  computed: {
    password: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
