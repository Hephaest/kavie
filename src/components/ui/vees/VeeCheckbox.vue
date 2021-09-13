<template>
  <div>
    <vee-field
      :name="name"
      :label="label"
      :value="value"
      type="checkbox"
      class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      :disabled="disabled"
    />
    <slot></slot>
    <error-message class="text-red-600 block" :name="name" />
  </div>
</template>

<script>
export default {
  name: 'VeeCheckbox',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
