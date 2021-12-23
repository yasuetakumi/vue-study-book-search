<template>
  <div class="page-innerset">
    <div class="innerset-header" 
    
    >
      
      <slot name="title">
        <div class="text-h5 font-weight-bold py-2 px-2">{{ title }}</div>
      </slot>

      <v-divider v-if="divider" class="mb-3"></v-divider>

      <slot name="subtitle"></slot>
      
    </div>
    <div class="py-2 px-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { default: 'Page' },
      divider: { default: true },
      // stickyHeader: { type: Boolean, default: false }
    },

    computed: {
      // stickyHeaderClass(){ return this.stickyHeader && 'header-sticky pt-3' }
    }
  };
</script>

<style lang="scss">

  html, body {
    overflow: initial !important
  }

  .page-innerset {
    .innerset-header {
      background-color: #fff;

      // &.header-sticky {
      //   @include position-sticky;
      //   z-index: 90; top: 4rem;
      // }
    }
  }
</style>