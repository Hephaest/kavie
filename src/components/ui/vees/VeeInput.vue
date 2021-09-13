<template>
  <div>
    <label class="inline-block mb-2">{{ label }}</label>
    <template v-if="shouldShowErrors">
      <vee-field :name="name" :label="label" :bails="false" v-slot="{ field, errors }">
        <input
          :type="type"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 focus:bg-white rounded"
          :class="inputClass"
          :placeholder="placeholder"
          :disabled="disabled"
          v-bind="field"
          @input="inputHandler"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </template>
    <template v-else>
      <vee-field
        :type="type"
        :name="name"
        :label="label"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-green-500 focus:bg-white rounded"
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="inputHandler"
      />
      <error-message class="text-red-600" :name="name" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'VeeInputField',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorType: {
      type: String,
      default: 'single',
    },
  },
  emits: ['input'],
  computed: {
    shouldShowErrors() {
      return this.errorType === 'multiple';
    },
    inputClass() {
      return this.placeholder ? 'bg-white' : 'bg-gray-50';
    },
  },
  methods: {
    inputHandler() {
      this.$emit('input');
    },
  },
};
</script>
