<template>
  <main>
    <!-- Introduction -->
    <section class="relative mb-8 w-full h-full bg-cover home-bg bg-center">
      <div
        class="absolute flex flex-col items-center justify-end mx-auto inset-x-0 bottom-2"
      >
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5 brand-font text-center">
            {{ $t('brand.name') }}
          </h1>
          <p class="text-center" v-html="$t('brand.slogan')"></p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto pb-8">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 flex flex-row justify-between space-x-4"
        >
          <span class="card-title my-auto sm:text-4xl text-xl text-gray-700">{{ $t('kpop.rankingBoard', { type: i18nChoice }) }}</span>
          <div class="flex flex-col">
            <div class="inline-flex min-w-max" :class="providerClass">
              <span
                class="self-end pb-2 pr-1 text-gray-400 text-base font-normal whitespace-pre"
                >{{ $t('kpop.sourceFrom') }}</span
              >
              <img
                class="h-12 w-auto"
                src="https://cdnimg.melon.co.kr/resource/image/web/common/logo_melon142x99.png"
                alt="MelOn 로고 이미지"
              />
            </div>
            <select
              v-model="choice"
              class="block mt-1 py-1.5 px-3 text-green-400 border-2 melon-color transition
              duration-500 focus:outline-none focus:border-green-400 rounded font-semibold"
            >
              <option value="live">{{ $t('kpop.rankingType.live') }}</option>
              <option value="day">{{ $t('kpop.rankingType.day') }}</option>
              <option value="week">{{ $t('kpop.rankingType.week') }}</option>
              <option value="month">{{ $t('kpop.rankingType.month') }}</option>
            </select>
          </div>
        </div>
        <!-- Spinner -->
        <base-spinner v-if="shouldShowSpinner" />
        <!-- Error -->
        <not-found-card v-else-if="shouldShowError"></not-found-card>
        <!-- Playlist -->
        <ol id="playlist" v-else>
          <rank-item v-for="song in songs" :key="song.id" :song="song" />
        </ol>
        <!-- End Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RankItem from '@/components/home/RankItem.vue';
import IconAlt from '@/directives/icon-alt';

export default {
  name: 'Home',
  directives: {
    'icon-alt': IconAlt,
  },
  components: {
    RankItem,
  },
  data() {
    return {
      songs: [],
      shouldShowSpinner: true,
      shouldShowError: false,
      choice: 'live',
    };
  },
  computed: {
    ...mapState({ historyChoice: (state) => state.melon.choice }),
    i18nChoice() {
      switch (this.choice) {
        case 'day': return this.$t('kpop.rankingType.day');
        case 'week': return this.$t('kpop.rankingType.week');
        case 'month': return this.$t('kpop.rankingType.month');
        case 'live':
        default: return this.$t('kpop.rankingType.live');
      }
    },
    providerClass() {
      const { locale } = this.$i18n;
      if (locale === 'en' || locale === 'zh') {
        return 'flex-row';
      }
      return 'flex-row-reverse';
    },
  },
  watch: {
    async choice(newChoice) {
      this.changeChoice({ choice: newChoice });
      await this.loadSongs({ forceUpdate: true });
    },
  },
  async created() {
    this.choice = this.historyChoice;
    await this.loadSongs();
  },
  methods: {
    ...mapActions({
      getSongs: 'melon/getSongs',
      changeChoice: 'melon/changeChoice',
    }),
    async loadSongs(payload) {
      this.shouldShowSpinner = true;
      try {
        this.songs = await this.getSongs(payload);
      } catch (error) {
        this.shouldShowError = true;
      } finally {
        this.shouldShowSpinner = false;
      }
    },
  },
};
</script>

<style scoped>
.melon-color {
  border-color: #01cd3b;
}
</style>
