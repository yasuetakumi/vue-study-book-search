<template>
  <div class="d-flex flex-row mb-6">
    <div class="image-preview">
      <input
        type="file"
        ref="file"
        style="display: none"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        @change="onFileChange"
      />
      <v-img max-width="400px" min-width="200px" width="200px" :src="image.url" class="img-thumbnail"> </v-img>
    </div>
    <div class="d-flex flex-column ml-12">
      <v-btn fab small color="cyan darken-2" class="mb-1 white--text" @click.stop="$refs.file.click()">
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>

      <v-btn fab small color="grey darken-2" class="white--text" @click="deleteFile" :disabled="isNoFile">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
const noPicUrl = require('@/assets/noimage.png');
export function imageInitial() {
  return {
    url: noPicUrl,
    file: null,
    isModified: false,
  };
}

export default {
  props: {
    value: {
      type: Object,
    },
  },
  computed: {
    image: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    isNoFile() {
      return this.image.url == noPicUrl;
    },
  },
  methods: {
    reset() {
      const input = this.$refs.file;
      input.type = 'text';
      input.type = 'file';
    },

    onFileChange(e) {
      if (e && e.target.files[0]) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        this.image = { url, file, isModified: true };
      }
    },

    deleteFile() {
      const file = null;
      const url = noPicUrl;
      this.image = { url, file, isModified: true };
      this.reset();
    },
  },
};
</script>
<style lang="scss" scoped>
.image-preview {
  width: 120px;
  margin-top: 10px;
  position: relative;
}
.img-thumbnail {
  padding: 0.25rem;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
  max-width: 100%;
  height: auto;
}
</style>
