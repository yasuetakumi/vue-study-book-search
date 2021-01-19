<template>
  <div>
    <v-file-input v-bind="$attrs" @change="preview" v-model="image">
    </v-file-input>
    <div class="image-preview">
      <v-img :src="url" class="img-thumbnail"></v-img>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: File
  },
  computed: {
    image: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {
      url: require("@/assets/noimage.png")
    };
  },
  methods: {
    preview(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      } else {
        this.url = require("@/assets/noimage.png");
      }
    }
  }
};
</script>
<style lang="scss">
.image-preview {
  width: 120px;
  margin-top: 10px;
  position: relative;
}
.img-thumbnail {
  .img-thumbnail {
    padding: 0.25rem;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
    max-width: 100%;
    height: auto;
  }
}
</style>
