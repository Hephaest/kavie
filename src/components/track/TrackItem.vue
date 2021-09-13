<template>
  <div
    class="flex flex-col justify-start items-center text-center p-2"
  >
    <img class="md:h-48 md:w-48 h-28 w-28 shadow-lg" :src="track.imageUrl" :alt="track.name" />
    <a
      class="text-lg font-semibold hover:text-blue-400 text-gray-600 my-1"
      :href="track.link"
      target="_blank"
      >{{ track.name }}</a
    >
    <span class="text-sm font-light text-gray-500 my-1">{{
      track.artists
    }}</span>
    <span class="text-sm font-extralight text-gray-400">{{
      track.release_date
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'TrackItem',
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
};
</script>
