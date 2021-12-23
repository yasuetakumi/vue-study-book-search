<!-- document 
(e.g.) 
<FilterDateRange title="登録日時:" v-model="registrationDate" @input="onChangeDate"/>

required:
- title : caption

options:
- v-model: [minDate, maxDate]. Its type is 'date' (because of javascript implementation, it's returned as 'object' type)
      see 'value-type' of 'Props' section in the official document (https://www.npmjs.com/package/vue2-datepicker)
- @input: call input as soon as it gets changed 

--> 
<template>
  <InputGroup :title="title" :required="required" :optional="optional" class="mt-3">

    <!-- Single input mode - Start -->
    <template v-if="single">
      <DatePicker type="date" range :format="format" v-model="minDate" />
    </template>
    <!-- Single input mode - End -->

    <!-- Multiple input mode - Start -->
    <div v-else class="row mt-0 mx-n1">
      <div class="px-1 col-sm py-0 mb-3 mb-sm-0">
        <DatePicker type="date"  :value-type="valueType" :format="format" v-model="minDate" />
      </div>
      <div class="px-1 col-sm-auto py-0 d-none d-sm-block">
        <div class="py-2">
          <span class="center">~</span>
        </div>
      </div>
      <div class="px-1 col-sm py-0">
        <DatePicker type="date" :value-type="valueType" :format="format" v-model="maxDate" />
      </div>
    </div>
    <!-- Multiple input mode - End -->

  </InputGroup>
</template>

<script>
  import io from 'lodash';
  import 'vue2-datepicker/index.css';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/locale/ja';
  import InputGroup from '@views/_components/form_input/GFilterGroup';

  export default {
    components: { InputGroup, DatePicker },
    data(){
      return {
        minDate: this.dateStart || null,
        maxDate: this.dateEnd || null
      }
    },
    props: {
      title: { required: true },
      format: { default: 'YYYY-MM-DD' },
      required: { default: false },
      optional: { default: false },
      disabled: { default: false },
      single: { type: Boolean, default: false },
      valueType: { default: 'format' },
      dateStart: { default: '' },
      dateEnd: { default: ''},
    },
    watch: {
      minDate() {
        this.$emit( 'startInput',  this.minDate);
      },
      maxDate(){
        this.$emit( 'endInput',  this.maxDate );
      },
    }
  };
</script>

<style lang="scss">
// @import "@/assets/style/mixins";

.mx-datepicker {
  width: 100% !important;

  .mx-input {
    height: 2.5rem;
    border-color: rgba(0, 0, 0, 0.42);
    // @include box-shadow( none );
  }
}
</style>