<template>
  <section
    class="bg-gradient-to-r from-green-400 via-blue-400 to-indigo-400 my-8 py-6 px-8 container mx-auto rounded-lg"
  >
    <div class="flex md:flex-row flex-col md:items-center items-start text-center text-white justify-between space-y-4 space-x-0 md:space-y-0 md:space-x-8">
      <!-- Left Content -->
      <div class="flex flex-row items-center space-x-6">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="h-20 w-20 text-3xl bg-white text-gray-800 rounded-full focus:outline-none hover:text-gray-600"
          @click.prevent="togglePlayerHandler"
        >
          <i class="fas cursor-pointer" :class="buttonClass"></i>
        </button>
        <div class="text-left flex flex-col space-y-2">
          <!-- Song Info -->
          <div>
            <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
            <div>{{ song.genre }}</div>
          </div>
          <span class="text-xl">
            <i class="fa-heart mr-2" :class="iconClass" @click="toggleLoveHandler"></i>
            {{ loveCount }}
          </span>
        </div>
      </div>
      <!-- Right Content -->
      <div class="flex md:flex-col md:space-y-1 md:space-x-0 flex-row space-x-2 justify-center items-center">
        <!-- Avatar -->
        <img :src="avatarURL" class="rounded-full md:h-24 md:w-24 md:ml-0 ml-4 h-12 w-12 shadow-2xl bg-white object-cover" alt="User Avatar">
        <span class="md:text-xl text-sm font-medium">{{ artistName }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    song: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  data() {
    return {
      isPlaying: false,
      avatarURL: '/assets/img/vendor/user/avatar.svg',
      hasLoveClicked: false,
      loveCount: 0,
      artistName: '',
    };
  },
  computed: {
    ...mapState({
      audio: (state) => state.audio.song,
    }),
    ...mapGetters({
      isAudioPlaying: 'audio/isPlaying',
    }),
    isSameSong() {
      return this.song.sid === this.audio.sid;
    },
    buttonClass() {
      if (this.isSameSong) return this.isAudioPlaying ? 'fas fa-pause' : 'fas fa-play';
      return this.isPlaying ? 'fa-pause' : 'fa-play';
    },
    iconClass() {
      return this.hasLoveClicked ? 'fas pulse cursor-pointer' : 'far';
    },
  },
  methods: {
    ...mapActions({
      playSong: 'audio/playSong',
      toggleAudio: 'audio/toggleAudio',
      getUserData: 'users/getUserData',
    }),
    togglePlayerHandler() {
      this.isPlaying = !this.isPlaying;
      if (!this.isSameSong) {
        this.playSong({ song: this.song });
      } else {
        this.toggleAudio();
      }
    },
    toggleLoveHandler() {
      if (this.disabled) return;
      this.hasLoveClicked = !this.hasLoveClicked;
      this.loveCount += this.hasLoveClicked ? 1 : -1;
      this.$emit('toggle-love', {
        data: {
          loveCount: this.loveCount,
          isLove: this.hasLoveClicked,
        },
      });
    },
  },
  async created() {
    const { uid, sid } = this.song;
    this.loveCount = this.song.loveCount;

    const singerData = await this.getUserData({ uid });
    if (!singerData) return;
    // Check avatar url
    this.avatarURL = singerData.avatarURL;
    this.artistName = singerData.name;

    if (!this.user) return;
    // Check user love state
    this.hasLoveClicked = this.user.loves.includes(sid);
  },
};
</script>

<style scoped>
@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.5, 1.5, 1.5);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.pulse {
  animation: pulse 0.5s ease-in-out;
}
</style>
