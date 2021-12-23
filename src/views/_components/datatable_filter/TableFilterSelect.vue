<template>
  <InputGroup :title="title" :required="required" :optional="optional" class="mt-3">
    <v-select outlined dense :items="items" v-model="selectModel" :item-value="itemValue" :item-text="itemName" :no-data-text="$t('general.filter.noItem')" ></v-select>
  </InputGroup>
</template>

<script>
  import io from 'lodash';
  import InputGroup from '@views/_components/form_input/GFilterGroup';

  export default {
    components: { InputGroup },
    props: {
      title: { required: true },
      value: { required: true },
      items: { required: true, type: Array, default: () => [] },
      option: { default: 'name' },
      required: { default: false },
      optional: { default: false },
      disabled: { default: false }
    },
    computed: {
      selectModel: {
        get(){ return this.value },
        set( value ){ this.$emit( 'input', value )}
      },
      itemPair(){
        var option = this.option;
        if( !io.isArray( option )) option = [ option, option ];
        return option;
      },
      itemValue(){ return this.itemPair[0]},
      itemName(){ return this.itemPair[1]},
    }
  };
</script>
