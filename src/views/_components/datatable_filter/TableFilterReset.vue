<template>
  <a class="blue--text filter-reset" @click.prevent="$emit('click')">{{ $t('general.form.reset') }} </a>
</template>

<style lang="scss">
  .filter-reset {
    color: inherit;
    text-decoration: none;
  }
</style>