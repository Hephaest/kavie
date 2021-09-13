<template>
  <!-- Greeting from artist -->
  <div
    v-if="fanbase.owner"
    class="flex flex-row items-start mb-3"
    :class="{ fadeIn: shouldShowArtist, invisible: !shouldShowArtist }"
    v-observer="{ callback: visibilityChangedHandler, once: true }"
  >
    <img
      :src="getArtistImgUrl(fanbase.imageUrl)"
      class="rounded-full w-8 h-8 mt-2"
    />
    <!-- Bubble -->
    <div
      class="rounded-full border border-gray-200 bg-transparent py-2 px-4 flex flex-row items-center ml-2"
    >
      <img
        class="w-6 h-6"
        src="https://user-images.githubusercontent.com/1303154/88677602-1635ba80-d120-11ea-84d8-d263ba5fc3c0.gif"
        alt="hi"
      />
      <span class="ml-2 text-gray-700 font-semibold">{{ greeting }}</span>
    </div>
  </div>
  <!-- Information from fan club -->
  <div class="flex flex-row items-start mb-3" :class="{ fadeIn: shouldShowFanClub, invisible: !shouldShowFanClub }">
    <img
      class="rounded-full w-8 h-8 mt-2"
      src="/assets/img/vendor/fan.svg"
      alt="Fan logo"
    />
    <!-- Bubble -->
    <div
      class="flex flex-col flex-wrap rounded-lg border border-gray-200 bg-transparent py-2 px-4 ml-2"
    >
      <!-- Fan NickName -->
      <div v-if="fanbase.nickName" class="text-lg">
        <span class="font-normal text-gray-500">{{ $t('fandom.name') }}: </span>
        <span class="font-medium text-gray-700">{{ fanbase.nickName }}</span>
      </div>
      <!-- Colors -->
      <div v-if="fanbase.colors" class="flex flex-row">
        <span class="font-normal text-lg text-gray-500">{{ $tc('fandom.colors', fanbase.colors.length) }}: </span>
        <span
          v-for="color in fanbase.colors"
          :key="color"
          :style="{ backgroundColor: color }"
          class="w-10 m-1"
        ></span>
      </div>
      <!-- Fanchant -->
      <div v-if="fanbase.fanchant" class="flex flex-col text-gray-600">
        <span class="font-normal text-lg text-gray-500">{{ $t('fandom.fanchant') }}: </span>
        <div class="flex felx-row my-1">
          <i class="fas fa-quote-left self-start text-xs"></i>
          <span class="self-center fanchant-font px-2">{{
            fanbase.fanchant
          }}</span>
          <i class="fas fa-quote-right self-end text-xs"></i>
        </div>
      </div>
      <!-- Labels -->
      <div class="flex flex-row my-1 items-center">
        <span class="font-normal text-lg text-gray-500 pr-1">{{ $tc('fandom.links', numOfLinks) }}: </span>
        <div class="flex flex-row flex-wrap">
          <a
            class="bg-pink-300 text-white p-2 my-1 mr-2 hover:text-white hover:bg-pink-400"
            v-if="fanbase.wiki"
            :href="fanbase.wiki"
            target="_blank"
            >{{ $t('fandom.wiki') }}</a
          >
          <a
            class="bg-indigo-300 text-white p-2 my-1 mr-2 hover:text-white hover:bg-indigo-400"
            v-if="fanbase.site"
            :href="fanbase.site"
            target="_blank"
            >{{ $t('fandom.officialSite') }}</a
          >
          <a
            class="bg-red-300 text-white p-2 my-1 mr-2 hover:text-white hover:bg-red-400"
            v-if="fanbase.store"
            :href="fanbase.store"
            target="_blank"
            >{{ $t('fandom.officialStore') }}</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- Response from user -->
  <span
    class="self-end rounded-full bg-gray-200 py-2 px-4 text-gray-700"
    :class="{ scaleInRight: shouldShowUser, invisible: !shouldShowUser }"
    >{{ $t('fandom.gotcha') }}</span
  >
</template>

<script>
export default {
  name: 'ChatCard',
  props: {
    fanbase: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      shouldShowArtist: false,
      shouldShowFanClub: false,
      shouldShowUser: false,
    };
  },
  computed: {
    greeting() {
      const { owner: { name, type } } = this.fanbase;
      const { locale } = this.$i18n;
      const defaultGreeting = this.fanbase.greeting;
      // Use default greeting first
      if (defaultGreeting) return defaultGreeting[locale];
      if (type === 'single') return this.$t('fandom.singleGreeting', { name });
      return this.$t('fandom.groupGreeting', { name });
    },
    numOfLinks() {
      let count = 0;
      if (this.fanbase.wiki) count += 1;
      if (this.fanbase.site) count += 1;
      if (this.fanbase.store) count += 1;
      return count;
    },
  },
  methods: {
    getArtistImgUrl(url) {
      return url || '/assets/img/errors/user.svg';
    },
    visibilityChangedHandler(isVisible) {
      if (!isVisible || this.shouldShowArtist) return;
      // Animate artist message
      this.shouldShowArtist = true;
      // Animate fan club message
      setTimeout(() => {
        this.shouldShowFanClub = true;
      }, 1000);
      // Animate user response
      setTimeout(() => {
        this.shouldShowUser = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
}

@keyframes scaleInRight {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scaleInRight {
  animation-name: scaleInRight;
  animation-duration: 1s;
  transform-origin: 100% 100%;
}

.fanchant-font {
  font-family: 'Nanum Pen Script', sans-serif;
  font-size: 32px;
}
</style>
