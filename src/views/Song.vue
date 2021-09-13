<template>
  <main class="pb-8" v-if="song">
    <!-- Music Header -->
    <music-header :song="song" :user="user" class="mb-8" @toggle-love="toggleLoveHandler" :disabled="!hasLoggedIn"/>
    <!-- Form -->
    <section class="container mx-auto" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 flex flex-row items-center justify-between">
          <!-- Comment Count -->
          <span class="text-2xl">{{ $tc('comment.count', commentCount, { count: commentCount }) }}</span>
          <!-- Sort Comments -->
          <select
            v-model="sortOrder"
            class="block py-1.5 px-3 text-green-400 border-2 border-green-400 transition
            duration-500 focus:outline-none focus:border-green-400 rounded font-semibold"
          >
            <option value="desc">{{ $t('comment.sortByLatest') }}</option>
            <option value="asc">{{ $t('comment.sortByOldest') }}</option>
          </select>
        </div>
        <div class="px-6">
          <!-- Alert Box -->
          <base-alert class="mx-6 mt-4 mb-2" scene="addComment" :to="state" />
          <comment-form
            class="border-b border-gray-200"
            :disabled="shouldDisable"
            @submit="submitHandler"
            v-if="hasLoggedIn"
          />
          <ul v-if="sortedComments.length" class="divide-y divide-gray-200">
            <!-- Comments -->
            <comment-card
              v-for="comment in sortedComments"
              :user="user"
              :key="comment.cid"
              :comment="comment"
              :hasLoggedIn="hasLoggedIn"
            />
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { getStorageErrorMessage } from '@/utils/errors';
import CommentForm from '@/components/comment/CommentForm.vue';
import CommentCard from '@/components/comment/DetailCard.vue';
import MusicHeader from '@/components/song/Header.vue';

export default {
  name: 'Song',
  components: {
    MusicHeader,
    CommentForm,
    CommentCard,
  },
  data() {
    return {
      song: null,
      user: null,
      sortOrder: 'desc',
      state: {
        name: 'idle',
        error: null,
      },
      commentCount: 0,
    };
  },
  computed: {
    ...mapState({
      hasLoggedIn: (state) => state.auth.hasUserLoggedIn,
      comments: (state) => state.comments.comments,
    }),
    ...mapGetters({
      hasSound: 'audio/hasSound',
      uid: 'auth/userId',
    }),
    shouldDisable() {
      return this.state.name === 'active';
    },
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sortOrder === 'desc') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
  },
  watch: {
    sortOrder(newValue) {
      const { sort } = this.$route.query;
      if (sort === newValue) return;
      this.$router.push({
        query: {
          sort: newValue,
        },
      });
    },
  },
  async created() {
    const { id: sid } = this.$route.params;
    // Get song
    this.song = await this.getSong({ sid });

    if (!this.song) {
      this.$router.push({ name: 'home' });
      return;
    }
    this.commentCount = this.song.commentCount;

    // Get user
    if (this.uid) {
      this.user = await this.getUserData({ uid: this.uid });
    }
    // Get comments
    await this.getComments({ sid });

    const { sort } = this.$route.query;
    this.sortOrder = sort === 'desc' || sort === 'asc' ? sort : 'desc';
  },
  methods: {
    ...mapActions({
      updateSong: 'songs/updateSong',
      getSong: 'songs/getSong',
      getUserData: 'users/getUserData',
      updateUserData: 'users/updateUserData',
      getComments: 'comments/getComments',
      addComment: 'comments/addComment',
    }),
    resetFormHandler({ action }) {
      setTimeout(() => {
        this.state = { name: 'idle', error: null };
        action();
      }, 1500);
    },
    async submitHandler(payload) {
      const { data, action } = payload;
      const { sid } = this.song;
      this.state = { name: 'active' };

      try {
        await this.addComment({ sid, data });
        // Lazy Loading
        this.commentCount += 1;
        await this.updateSong({ sid, data: { commentCount: this.commentCount } });
        this.state = { name: 'resolved' };
        this.resetFormHandler({ action });
      } catch (error) {
        const code = getStorageErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.state = { name: 'rejected', error: errorMsg };
      }
    },
    async toggleLoveHandler(payload) {
      const { sid } = this.song;
      const { data: { loveCount, isLove } } = payload;

      await this.updateSong({ sid, data: { loveCount } });

      const { loves } = this.user;
      if (isLove) loves.push(sid);
      else loves.splice(loves.indexOf(sid), 1);
      await this.updateUserData({ uid: this.uid, data: { loves } });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.needConfirmUnsavedChange) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const confirmLeaveWithUnsavedChanges = confirm(this.$t('warn.leaveWithoutSave'));
      next(confirmLeaveWithUnsavedChanges);
      return;
    }
    next();
  },
};
</script>
