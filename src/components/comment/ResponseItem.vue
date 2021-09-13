<template>
  <div class="flex flex-row space-x-4 mt-4 w-full items-start">
    <img
      class="mt-1 w-8 h-8 rounded-full shadow-xl bg-white object-cover"
      :src="avatarURL"
      alt="User Avatar"
    />
    <div
      class="flex flex-col items-start justify-center bg-gray-50 px-4 py-2 rounded-lg"
    >
      <div class="flex flex-row space-x-6 items-center">
        <div class="flex flex-col">
          <span class="font-bold text-base">{{ userName }}</span>
          <span class="text-sm text-gray-600">{{ datePosted }}</span>
          <span class="text-lg mt-1">{{ comment.content }}</span>
        </div>
        <button
          class="flex flex-row space-x-2 items-center text-gray-400 hover:text-gray-600"
          type="button"
          @click="replyHandler"
          v-if="!disabled"
        >
          <i class="fas fa-reply"></i>
          <span>{{ $t('common.reply') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';
import { enUS as en, zhCN as zh, ja, ko } from 'date-fns/locale';

const localeOptions = { en, zh, ja, ko };

export default {
  name: 'ResponseItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  emits: ['reply'],
  data() {
    return {
      userName: '',
      avatarURL: '/assets/img/vendor/user/avatar.svg',
    };
  },
  computed: {
    datePosted() {
      const date = Date.parse(this.comment.datePosted);
      return formatRelative(date, new Date(), {
        locale: localeOptions[this.$i18n.locale],
      });
    },
  },
  async created() {
    // Get Avatar
    const { uid } = this.comment;
    const data = await this.getUserData({ uid });
    if (!data) return;
    this.avatarURL = data.avatarURL;
    this.userName = data.name;
  },
  methods: {
    ...mapActions({
      getUserData: 'users/getUserData',
    }),
    replyHandler() {
      this.$emit('reply', { comment: this.comment });
    },
  },
};
</script>
