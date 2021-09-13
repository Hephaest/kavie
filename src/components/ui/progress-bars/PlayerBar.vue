<template>
  <!-- For transition sake, add a div wrap-->
  <div>
    <div
      class="fixed inset-x-0 bottom-0 bg-white py-2 md:px-8 px-4 flex flex-row items-center justify-between align-top w-full text-gray-400 md:text-lg text-base border-t border-gray-100 shadow-2xl md:space-x-4 space-x-1"
      v-show="shouldShowPlayer"
    >
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i class="fa hover:text-gray-600 text-xl" :class="buttonClass"></i>
      </button>
      <div class="flex-grow flex flex-row items-center space-x-2">
        <!-- Current Position -->
        <span class="text-green-400 md:w-24 w-14 text-right">{{ seek }}</span>
        <!-- Scrub -->
        <div
          class="flex flex-col justify-center items-center space-y-0.5 w-full h-full text-base"
        >
          <p v-if="song.modifiedName" class="whitespace-nowrap overflow-hidden" style="text-overflow: ellipsis;">{{ songInfoText }}</p>
          <!-- Scrub Container  -->
          <span
            class="block w-full h-2 rounded bg-gray-200 relative cursor-pointer"
            @mouseover.prevent="mouseOverHandler"
            @mouseleave.prevent="mouseLeaveHandler"
            @mousedown.prevent="mouseDownHandler"
            @mousemove.prevent="mouseMoveHandler"
            @mouseup.prevent="mouseUpHandler"
          >
            <!-- Player Ball -->
            <transition name="grow">
              <span
                class="absolute top-neg-8 text-green-600 text-lg"
                :style="{ left: `calc(${progress}% - 9px)` }"
                v-show="shouldBallShow"
              >
                <i class="fas fa-circle"></i>
              </span>
            </transition>
            <!-- Player Progress Bar-->
            <span
              class="block h-2 rounded bg-gradient-to-r from-green-400 to-green-600"
              :style="{ width: `${progress}%` }"
            ></span>
          </span>
          <span class="invisible">songInfoText</span>
        </div>
        <!-- Duration -->
        <span class="text-green-600 md:w-24 w-14 text-left">{{ duration }}</span>
      </div>
      <button type="button" @click.prevent="togglePlayerHandler">
        <i class="fas fa-angle-double-down text-2xl hover:text-gray-600"></i>
      </button>
    </div>
    <div
      v-show="!shouldShowPlayer"
      class="fixed bottom-0 right-0 bg-transparent py-2 px-8 w-28 align-bottom text-gray-400 text-lg flex flex-col items-center"
    >
      <img
        class="w-full -mb-4"
        style="transform: scale(1.2);"
        src="https://media2.giphy.com/media/SqBjfxxXe7EZYMpklR/giphy.gif?cid=790b7611b6673ce5a04f6ad57decefdaf51d3d0bf03c86d3&rid=giphy.gif&ct=s"
        @click.prevent="togglePlayerHandler"
      >
      <button type="button" class="w-full hover:text-gray-600" @click.prevent="togglePlayerHandler">
        <i class="fas fa-angle-double-up text-2xl cursor-pointer"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

const states = {
  play: 0,
  pause: 1,
};

export default {
  name: 'PlayerBar',
  data() {
    return {
      shouldBallShow: false,
      isMouseDown: false,
      preferredState: states.pause,
      shouldShowPlayer: true,
      user: null,
    };
  },
  computed: {
    ...mapGetters('audio', ['progress', 'seek', 'duration', 'isPlaying']),
    ...mapState('audio', { song: (state) => state.song }),
    buttonClass() {
      return this.isPlaying ? 'fa-pause' : 'fa-play';
    },
    songInfoText() {
      return `${this.song.modifiedName} - ${this.displayName}`;
    },
    displayName() {
      return this.user ? this.user.name : '';
    },
  },
  methods: {
    ...mapActions({
      toggleAudio: 'audio/toggleAudio',
      updateSeek: 'audio/updateSeek',
      getUserData: 'users/getUserData',
    }),
    mouseOverHandler() {
      this.shouldBallShow = true;
    },
    mouseLeaveHandler() {
      this.shouldBallShow = false;
      this.isMouseDown = false;
    },
    mouseDownHandler() {
      this.isMouseDown = true;
      this.preferredState = this.isPlaying ? states.play : states.pause;
      if (!this.isPlaying) return;
      this.toggleAudio();
    },
    mouseMoveHandler(event) {
      if (!this.isMouseDown) return;
      this.updateSeek(event);
    },
    mouseUpHandler(event) {
      this.isMouseDown = false;
      this.updateSeek(event);
      if (this.preferredState === states.play) this.toggleAudio();
    },
    togglePlayerHandler() {
      this.shouldShowPlayer = !this.shouldShowPlayer;
    },
  },
  async created() {
    const { uid } = this.song;
    this.user = await this.getUserData({ uid });
  },
};
</script>

<style scoped>
.grow-enter-active {
  animation: grow-in 0.1s;
}
.grow-leave-active {
  animation: grow-in 0.1s reverse;
}

@keyframes grow-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
