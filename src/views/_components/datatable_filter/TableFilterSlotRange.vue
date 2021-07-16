
<template>
  <InputGroup :title="title" :required="required" :optional="optional" class="mt-3">
    <div class="row mx-n1">
      <div class="px-1 col-sm py-0 mb-1 mb-sm-0">
        <slot name="min"></slot>
      </div>
      <div class="px-1 col-sm-auto py-0 d-none d-sm-block">
        <div class="py-2">
          <span class="center">~</span>
        </div>
      </div>
      <div class="px-1 col-sm py-0">
        <slot name="max"></slot>
      </div>
    </div>
  </InputGroup>
</template>

<script>
  import InputGroup from '@views/_components/form_input/GFilterGroup';
  export default {
    components: { InputGroup },
    props: {
      title: { required: true },
      required: { default: false },
      optional: { default: false },
    },
  };
</script>