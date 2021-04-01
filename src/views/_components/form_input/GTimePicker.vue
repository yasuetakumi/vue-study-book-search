<template>
  <v-menu
    v-model="isOpen"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        clearable
        v-model="inputVal"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="{ ...attrs, ...tfAttrs }"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-model="inputVal"
      v-if="isOpen"
      @click:minute="isOpen = false"
      v-bind="tpAttrs"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: String
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    tpAttrs() {
      return Object.entries(this.$attrs).reduce((acc, [key, val]) => {
        if (key.substring(0, 2) == "tp") {
          return { [key.substring(3, key.length)]: val, ...acc };
        } else {
          return acc;
        }
      }, {});
    },
    tfAttrs() {
      return Object.entries(this.$attrs).reduce((acc, [key, val]) => {
        if (key.substring(0, 2) == "tf") {
          return { [key.substring(3, key.length)]: val, ...acc };
        } else {
          return acc;
        }
      }, {});
    }
  }
};
</script>
