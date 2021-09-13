<template>
  <base-headline :title="$t('track.track')" borderColor="border-yellow-400"/>
  <span class="text-lg font-normal text-gray-500 my-1"
    >{{ $t('track.platformIntro', { name: track.name, duration }) }}</span
  >
  <div class="self-start flex flex-row flex-wrap my-2">
    <retailer-card :href="`https://www.melon.com/search/total/index.htm?q=${track.name}`" src="/assets/img/vendor/retailers/melon.png" name="Melon logo" />
    <retailer-card :href="`https://open.spotify.com/search/${track.name}`" src="/assets/img/vendor/retailers/spotify.png" name="Spotify logo" />
    <retailer-card :href="`https://music.apple.com/us/search?term=${track.name}`" src="/assets/img/vendor/retailers/apple-music.png" name="Apple Music logo" />
    <retailer-card :href="`https://music.youtube.com/search?q=${track.name}`" src="/assets/img/vendor/retailers/youtube-music.png" name="Youtube Music logo" />
    <retailer-card :href="`https://www.amazon.com/s?k=${track.name}&i=digital-music`" src="/assets/img/vendor/retailers/amazon-music.png" name="Amazon Music logo" />
    <retailer-card :href="`https://www.kkbox.com/tw/tc/search.php?word=${track.name}`" src="/assets/img/vendor/retailers/kkbox.png" name="KKBOX logo" />
    <retailer-card :href="`https://y.qq.com/n/ryqq/search?w=${track.name}&t=song`" src="/assets/img/vendor/retailers/qq-music.png" name="QQ Music logo" />
    <retailer-card :href="`https://music.163.com/#/search/m/?s=${track.name}`" src="/assets/img/vendor/retailers/netease-music.png" name="Netease Music logo" />
  </div>
  <iframe
    :src="`https://open.spotify.com/embed/track/${track.id}`"
    class="h-20 w-full rounded-md my-3"
    frameBorder="0"
    allowtransparency="true"
    allow="encrypted-media"
  ></iframe>
</template>

<script>
import RetailerCard from '@/components/ui/cards/RetailerCard.vue';

export default {
  name: 'DetailCard',
  components: {
    RetailerCard,
  },
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  computed: {
    duration() {
      const { minutes, seconds } = this.track.duration;
      const minuteStr = this.$tc('timeFormat.minute', minutes, { count: minutes });
      const secondStr = this.$tc('timeFormat.second', seconds, { count: seconds });
      return this.$t('timeFormat.duration', { minutes: minuteStr, seconds: secondStr });
    },
  },
};
</script>
