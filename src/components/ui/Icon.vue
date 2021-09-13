<template>
  <a :href="href" target="_blank">
    <img
      class="h-8 w-auto px-2"
      :src="src"
      :alt="alt"
    />
  </a>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    href: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
  },
};
</script>
