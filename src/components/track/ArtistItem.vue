<template>
  <div
    class="flex flex-col justify-start items-center text-center p-2"
  >
    <img
      class="md:h-32 md:w-32  w-20 h-20 rounded-full"
      :src="getArtistImgUrl(artist.imageUrl)"
      :alt="artist.name"
    />
    <a
      class="text-lg font-semibold text-gray-600 my-1"
      :href="`https://en.wikipedia.org/wiki/${artist.name}`"
      target="_blank"
      >{{ artist.name }}</a
    >
    <span class="text-2xl font-semibold text-green-500 my-1">{{
      artist.followers
    }}</span>
    <span class="text-sm font-sm text-gray-400">{{ artist.genres }}</span>
  </div>
</template>

<script>
export default {
  name: 'ArtistItem',
  props: {
    artist: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getArtistImgUrl(url) {
      return url || '/assets/img/errors/user.svg';
    },
  },
};
</script>
