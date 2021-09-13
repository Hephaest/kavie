<template>
  <div class="flex-grow flex flex-col items-center container mx-auto space-y-6 justify-center">
    <span class="text-lg text-gray-600">{{ title }}</span>
    <img class="w-1/4 h-auto self-center" src="/assets/img/vendor/errors/empty.svg" alt="Empty Result">
  </div>
</template>

<script>
export default {
  name: 'EmptyCard',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
