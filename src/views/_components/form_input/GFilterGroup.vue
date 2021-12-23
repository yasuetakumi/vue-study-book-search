<template>
  <div class="row">
    <div class="col-md-4 d-flex align-items-center">
      <strong class="input-title">{{ title }}</strong>
    </div>
    <div class="col-md-8">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
    },
    required: Boolean,
    optional: Boolean,
  },
};
</script>

<style lang="scss">
  .input-title {
    font-size: 1rem;
  }
</style>
