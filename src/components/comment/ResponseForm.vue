<template>
  <div class="flex flex-row space-x-4 mt-4 w-full items-start">
    <img
      class="mt-1 w-8 h-8 rounded-full shadow-xl bg-white object-cover"
      :src="avatarURL"
      alt="User Avatar"
    />
    <div class="flex-grow flex flex-col justify-start space-y-1">
      <div class="relative flex items-center bg-gray-50 px-4 py-2 rounded-lg">
        <textarea
          class="outline-none border-none shadow-none resize-none bg-transparent w-full text-lg font-normal"
          name="input"
          v-model="inputText"
          :placeholder="placeholderText"
          style="caret-color: black;"
          :style="textAreaStyle"
          cols="30"
          rows="1"
          ref="inputForm"
          @keydown.tab.esc.ctrl.alt.shift.meta.up.down.left.right.prevent
          @keydown.enter.prevent
          @keyup.enter="submitHandler"
          @scroll.prevent="scrollHandler"
        ></textarea>
        <!-- Click event pass-through -->
        <span
          ref="inputSpan"
          class="absolute inset-x-4 inset-y-2 bg-transparent text-lg font-normal break-words whitespace-pre-line overflow-y-scroll pointer-events-none"
          :style="textAreaStyle"
          v-html="inputHTML"
        >
        </span>
      </div>
      <span class="px-4 font-light text-sm">{{ $t('comment.enterHint') }}</span>
      <div v-if="errorMessage" class="py-1.5 px-3 text-red-500">{{errorMessage}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const FONT_HEIGHT = 28;

const MAX_SCROLL_HEIGHT = FONT_HEIGHT * 3;

export default {
  name: 'ResponseForm',
  props: {
    atName: {
      type: String,
      required: false,
      default: '',
    },
    error: {
      type: Object,
      required: false,
    },
  },
  emits: ['submit'],
  data() {
    return {
      inputText: '',
      textAreaHeight: 28,
      avatarURL: '/assets/img/vendor/user/avatar.svg',
    };
  },
  computed: {
    ...mapGetters({
      uid: 'auth/userId',
    }),
    textAreaStyle() {
      return { height: `${this.textAreaHeight}px` };
    },
    inputHTML() {
      // Only render first one
      return this.inputText.replace(`@${this.atName}`, `<span class="text-blue-600">@${this.atName}</span>`);
    },
    placeholderText() {
      return this.atName ? '' : this.$t('comment.placeholder');
    },
    errorMessage() {
      const { scene, msg } = this.error || {};
      if (scene !== 'comment') return null;
      return msg;
    },
  },
  watch: {
    inputText() {
      // Set to auto to adjust height
      this.$refs.inputForm.style.height = 'auto';
      const numOfLines = Math.floor(
        this.$refs.inputForm.scrollHeight / FONT_HEIGHT,
      );
      this.textAreaHeight = numOfLines <= 3 ? numOfLines * FONT_HEIGHT : MAX_SCROLL_HEIGHT;
      this.$refs.inputSpan.scrollTop = this.$refs.inputSpan.scrollHeight - MAX_SCROLL_HEIGHT;
    },
  },
  methods: {
    ...mapActions({
      getUserData: 'users/getUserData',
    }),
    scrollHandler() {
      this.$refs.inputSpan.scrollTop = this.$refs.inputForm.scrollTop;
    },
    submitHandler() {
      if (this.inputText.length === 0) return;
      this.$emit('submit', {
        data: { comment: this.inputText, isReply: !!this.atName },
        action: () => {
          this.inputText = '';
        },
      });
    },
  },
  async created() {
    const data = await this.getUserData({ uid: this.uid });
    this.avatarURL = data.avatarURL;
    // If this is used to reply, show the name of the user who replied
    if (!this.atName) return;
    this.inputText = `@${this.atName} `;
  },
};
</script>
