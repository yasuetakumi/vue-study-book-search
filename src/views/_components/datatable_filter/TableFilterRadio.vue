<template>
  <InputGroup :title="title" :required="required" :optional="optional" class="mt-3 mb-3">
    <v-radio-group :row="row" v-model="radioModel" class="my-0">
      <slot></slot>
    </v-radio-group>
  </InputGroup>
</template>

<script>
  import InputGroup from '@views/_components/form_input/GFilterGroup';
  export default {
    components: { InputGroup },
    props: {
      title: { required: true },
      value: { required: true },
      row: { default: true },
      required: { default: false },
      optional: { default: false },
      disabled: { default: false }
    },
    computed: {
      radioModel: {
        get(){ return this.value },
        set( value ){ this.$emit( 'input', value )}
      }
    }
  };
</script>

<style lang="scss">
  .v-label {
    line-height: 1.6 !important;
    margin-bottom: 0 !important;
    font-size: 1rem !important;
  }
</style>