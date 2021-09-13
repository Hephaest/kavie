<template>
  <base-headline class="md:hidden" :title="$t('track.album')" borderColor="border-red-400"/>
  <div class="flex flex-row">
    <img class="md:h-48 md:w-48 h-28 w-28 rounded-md" alt="Album Image" :src="album.imageUrl" />
    <div class="flex flex-col md:ml-10 ml-4 my-auto">
      <base-headline class="hidden md:block" :title="$t('track.album')" borderColor="border-red-400"/>
      <span class="md:text-lg text-base font-normal text-gray-500 my-1">{{ albumType }}</span>
      <span class="md:text-3xl text-2xl font-bold text-gray-700 my-2">{{ album.name }}</span>
      <div class="flex flex-row md:text-lg text-base font-normal text-gray-600 my-1 space-x-4">
        <span>{{ relaseDate }}</span>
        <span class="whitespace-nowrap">
          {{ totalTracks }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  computed: {
    albumType() {
      return this.album.type === 'single' ? this.$t('track.single') : this.$t('track.album');
    },
    relaseDate() {
      const { year, month, day } = this.album.releaseDate;
      return this.$t('timeFormat.fullDate', { year, month, day });
    },
    totalTracks() {
      const number = +this.album.totalTracks;
      return this.$t('track.totalNumberOfTracks', {
        total: this.$t('common.total'),
        num: this.$tc('track.totalNumber', number, { count: number }),
      });
    },
  },
};
</script>
