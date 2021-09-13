<template>
  <div class="border border-gray-300 p-3 rounded-md flex flex-col">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'Border',
};
</script>
