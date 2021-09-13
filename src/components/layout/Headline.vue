<template>
  <span
    class="border-b-4 mb-6 font-bold text-gray-700 text-2xl"
    :class="headlineClasses"
    >{{ title }}</span
  >
</template>

<script>
export default {
  name: 'Headline',
  props: {
    title: {
      type: String,
      required: true,
    },
    alignSelf: {
      type: String,
      default: 'self-start',
    },
    borderColor: {
      type: String,
      default: 'border-green-400',
    },
  },
  computed: {
    headlineClasses() {
      return `${this.alignSelf} ${this.borderColor}`;
    },
  },
};
</script>
