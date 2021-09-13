<template>
  <div>
    <label class="inline-block mb-2">{{ label }}</label>
    <vee-field
      as="select"
      :name="name"
      :label="label"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 focus:bg-white rounded bg-gray-50"
      :disabled="disabled"
      @change="changeHandler"
    >
      <option v-for="{ value, text } in options" :value="value" :key="value">{{ text }}</option>
    </vee-field>
    <error-message class="text-red-600" :name="name" />
  </div>
</template>

<script>
export default {
  name: 'VeeSelect',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['change'],
  methods: {
    changeHandler() {
      this.$emit('change');
    },
  },
};
</script>
