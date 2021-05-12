<template>
  <v-dialog v-model="isOpen" width="1100">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        {{ form.openText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ form.title }}
      </v-card-title>

      <v-card-text>
        <div class="pt-5 px-5">
          <slot></slot>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="acceptDialog">
          {{ accept.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    /* Specify callback when save is clicked
     * For example, if we want to trigger api call, when save is clicked
     * put the method on cb
     */
    accept: {
      type: Object,
      default: function() {
        return {
          text: 'Save',
          cb: () => {},
        };
      },
    },
    form: {
      /* Specify text for open button and title */
      type: Object,
      default: function() {
        return {
          openText: 'Open',
          title: 'Form',
        };
      },
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async acceptDialog() {
      await this.accept.cb();
      this.isOpen = false;
    },
  },
};
</script>
