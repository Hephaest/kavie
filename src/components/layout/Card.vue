<template>
  <section class="mt-6 shadow-2xl rounded-lg bg-white border border-gray-200 flex flex-col px-10 py-5">
    <slot name="content"></slot>
  </section>
</template>

<script>
export default {
  name: 'ContentCard',
};
</script>
