<template>
  <span class="font-bold text-xl text-gray-600">{{ $t('fandom.socialMedia') }}</span>
  <!-- International App -->
  <div class="mt-2" v-if="shouldShowInternationalApps(medias)">
    <span class="font-normal text-base text-gray-500"
      >{{ $t('fandom.forInternationalFan') }}:</span
    >
    <!-- icons -->
    <div class="flex flex-row my-2 flex-wrap">
      <base-icon v-if="medias.instagram" :href="medias.instagram" src="/assets/img/vendor/icons/instagram.svg" alt="Instagram logo" />
      <base-icon v-if="medias.youtube" :href="medias.youtube" src="/assets/img/vendor/icons/youtube.svg" alt="Youtube logo" />
      <base-icon v-if="medias.twitter" :href="medias.twitter" src="/assets/img/vendor/icons/twitter.svg" alt="Twitter logo" />
      <base-icon v-if="medias.facebook" :href="medias.facebook" src="/assets/img/vendor/icons/facebook.svg" alt="Facebook logo" />
      <base-icon v-if="medias.tiktok" :href="medias.tiktok" src="/assets/img/vendor/icons/tiktok.svg" alt="Tiktok logo" />
    </div>
  </div>
  <!-- Korean App -->
  <template v-if="shouldShowKoreanApps(medias)">
    <div class="mt-2">
      <span class="font-normal text-base text-gray-500">{{ $t('fandom.forKoreanFan') }}:</span>
      <!-- icons -->
      <div class="flex flex-row my-2 flex-wrap">
        <base-icon v-if="medias.vlive" :href="medias.vlive" src="/assets/img/vendor/icons/vlive.png" alt="VLive logo" />
        <base-icon v-if="medias.bubble" :href="medias.bubble" src="/assets/img/vendor/icons/bubble.jpg" alt="Bubble logo" />
      </div>
    </div>
  </template>
  <!-- Chinese App -->
  <div class="mt-3" v-if="shouldShowChineseApps(medias)">
    <span class="font-normal text-base text-gray-500">{{ $t('fandom.forChineseFan') }}:</span>
    <!-- icons -->
    <div class="flex flex-row my-2 flex-wrap">
      <base-icon v-if="medias.weibo" :href="medias.weibo" src="/assets/img/vendor/icons/weibo.svg" alt="Weibo logo" />
      <base-icon v-if="medias.douyin" :href="medias.douyin" src="/assets/img/vendor/icons/tiktok.svg" alt="Douyin logo" />
      <base-icon v-if="medias.bilibili" :href="medias.bilibili" src="/assets/img/vendor/icons/bilibili.svg" alt="Bilibili logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialCard',
  props: {
    medias: {
      type: Object,
      required: true,
    },
  },
  methods: {
    shouldShowInternationalApps(medias) {
      const { instagram, youtube, facebook, twitter, tiktok } = medias;
      return instagram || youtube || facebook || twitter || tiktok;
    },
    shouldShowKoreanApps(medias) {
      const { vlive, bubble } = medias;
      return vlive || bubble;
    },
    shouldShowChineseApps(medias) {
      const { weibo, douyin, bilibili } = medias;
      return weibo || douyin || bilibili;
    },
  },
};
</script>
