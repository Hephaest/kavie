<template>
  <tweet-card v-if="vendors.twitter" :id="vendors.twitter" />
  <facebook-card class="mt-3" v-if="vendors.facebook" :url="vendors.facebook" />
</template>

<script>
import TweetCard from '@/components/ui/cards/TwitterCard.vue';
import FacebookCard from '@/components/ui/cards/FacebookCard.vue';

export default {
  name: 'ShareCard',
  components: {
    TweetCard,
    FacebookCard,
  },
  props: {
    vendors: {
      type: Object,
      required: true,
    },
  },
};
</script>
