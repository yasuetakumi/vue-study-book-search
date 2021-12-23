
<template>
  <InputGroup :title="title" :required="required" :optional="optional" class="mt-3">
    <v-text-field
      :hint="partial ? $t('general.hint.partial') : ''" 
      :disabled="isDisabled"
      outlined
      dense
      v-model="textModel"></v-text-field>
  </InputGroup>

</template>

<script>
  import InputGroup from '@views/_components/form_input/GFilterGroup';
  export default {
    components: { InputGroup },
    props: {
      title: { required: true },
      value: { required: true },
      required: { default: false },
      optional: { default: false },
      disabled: { default: false },
      partial: { default: false },
    },
    computed: {
      textModel: {
        get(){ return this.value },
        set( value ){ this.$emit( 'input', value )}
      },
      isDisabled(){
        return this.disabled
      }
    }
  };
</script>