<template>
  <button
    :type="type"
    class="block w-full bg-green-400 text-white py-1.5 px-3 rounded transition disabled:opacity-50"
    :class="buttonClass"
    :disabled="disabled"
    @click="clickHandler"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    buttonClass() {
      return this.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-500';
    },
  },
  methods: {
    clickHandler() {
      this.$emit('click');
    },
  },
};
</script>
