<template>
  <div class="row mt-2 mb-6">
    <div class="col-12 col-lg-10">
      <div class="row justify-space-between mx-lg-n10 mb-0">
        <template v-if="single">
          <div class="col">
            <slot name="default"></slot>
          </div>
        </template>
        <template v-else>
          <div class="px-lg-10 col-md-6 py-0">
            <slot name="left"></slot>
          </div>
          <div class="px-lg-10 col-md-6 py-0">
            <slot name="right"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      single: { default: false }
    }
  };
</script>