<template>
  <div ref="twitterCard" :style="style">
  </div>
</template>

<script>
const defaultOptions = {
  theme: 'light',
  conversation: 'none',
  width: '400',
  cards: 'visible',
  dnt: 'false',
};

export default {
  name: 'TwitterCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      default: 'en',
    },
  },
  computed: {
    width() {
      return window.innerWidth > 1024 ? 400 : 280;
    },
    style() {
      return `width: ${this.width}px`;
    },
  },
  mounted() {
    const js = document.createElement('script');
    js.setAttribute(
      'src',
      'https://platform.twitter.com/widgets.js',
    );
    // Wait for the script to load
    js.addEventListener('load', () => this.loadHandler(), false);
    this.$refs.twitterCard.appendChild(js);
  },
  methods: {
    async loadHandler() {
      const { widgets } = await window.twttr.ready();
      const customOptions = { ...defaultOptions, lang: this.lang, width: this.width };
      await widgets.createTweet(
        this.id,
        this.$refs.twitterCard,
        customOptions,
      );
    },
  },
};
</script>
