<template>
  <div class="flex flex-col">
    <!-- Comment Author -->
    <div class="mb-5 flex flex-row space-x-2 items-center">
      <img
        class="w-10 h-10 rounded-full shadow-xl bg-white object-cover"
        :src="avatarURL"
        alt="Comment Author Avatar"
      />
      <div class="flex flex-col items-start justify-center">
        <div class="font-bold">{{ userName }}</div>
        <span class="text-gray-600">{{ datePosted }}</span>
      </div>
    </div>
    <!-- Comment Body -->
    <p class="text-lg">
      {{ comment.content }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatRelative } from 'date-fns';
import { enUS as en, zhCN as zh, ja, ko } from 'date-fns/locale';

const localeOptions = { en, zh, ja, ko };

export default {
  name: 'CommentCard',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
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
  },
};
</script>
