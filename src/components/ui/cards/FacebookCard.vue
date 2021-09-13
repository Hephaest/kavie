<template>
  <div ref="facebookCard">
    <div class="fb-post overflow-x-auto" :data-href="url" :data-width="width" data-show-text="true" data-lazy="true"></div>
  </div>
</template>

<script>
export default {
  name: 'FacebookCard',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    width() {
      return window.innerWidth > 1024 ? '400' : '350';
    },
  },
  mounted() {
    const js = document.createElement('script');
    js.setAttribute(
      'src',
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2',
    );
    this.$refs.facebookCard.appendChild(js);
  },
};
</script>
