<template>
  <li class="p-6 flex flex-col">
    <!-- Comment Card -->
    <comment-card :comment="comment" />
    <!-- Reaction Form -->
    <reaction-form
      :comment="comment"
      :user="user"
      :commentCount="flwComments.length"
      @toggle-like="toggleLikeHandler"
      @toggle-comments="toggleCommentsHandler"
      :disabled="!hasLoggedIn"
    />
    <template v-if="shouldCommentsShow">
      <!-- Comment Form -->
      <response-form v-if="hasLoggedIn" @submit="submitHandler" :error="submitError"/>
      <!-- Comment List -->
      <response-item
        v-for="(comment, index) in flwComments"
        :key="index"
        :comment="comment"
        :disabled="!hasLoggedIn"
        @reply="replyHandler"
      />
      <!-- Reply Form -->
      <response-form v-if="shouldShowReplyForm" @submit="submitHandler" :atName="receiver" :error="submitError"/>
    </template>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CommentCard from '@/components/comment/CommentCard.vue';
import ReactionForm from '@/components/comment/ReactionForm.vue';
import ResponseForm from '@/components/comment/ResponseForm.vue';
import ResponseItem from '@/components/comment/ResponseItem.vue';
import { getStorageErrorMessage } from '@/utils/errors';

export default {
  name: 'DetailCard',
  components: {
    CommentCard,
    ReactionForm,
    ResponseForm,
    ResponseItem,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    hasLoggedIn: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      shouldCommentsShow: false,
      hasReplyBtnClicked: false,
      receiver: '',
      submitError: null,
    };
  },
  computed: {
    ...mapGetters({
      getFlwComment: 'flwComments/comment',
      uid: 'auth/userId',
    }),
    flwComments() {
      const { cid } = this.comment;
      return this.getFlwComment(cid) || [];
    },
    shouldShowReplyForm() {
      return this.hasLoggedIn && this.hasReplyBtnClicked;
    },
  },
  async created() {
    const { cid } = this.comment;
    await this.getFlwComments({ cid });
  },
  methods: {
    ...mapActions({
      updateUserData: 'users/updateUserData',
      updateComment: 'comments/updateComment',
      getFlwComments: 'flwComments/getComments',
      addComment: 'flwComments/addComment',
      addFlwComment: 'comments/addFollowedComment',
    }),
    toggleCommentsHandler(payload) {
      const { shouldCommentsShow } = payload;
      this.shouldCommentsShow = shouldCommentsShow;
    },
    replyHandler(payload) {
      const { name } = payload.comment;
      this.receiver = name;
      this.hasReplyBtnClicked = true;
    },
    async submitHandler(payload) {
      const { data, action } = payload;
      const { isReply } = data;
      this.submitError = null;

      try {
        const { cid } = this.comment;
        const fid = await this.addComment({ cid, data });
        await this.addFlwComment({ cid, fid });
        if (isReply) this.hasReplyBtnClicked = false;
        // self executed
        action();
      } catch (error) {
        const code = getStorageErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.submitError = { msg: errorMsg, scene: isReply ? 'reply' : 'comment' };
      }
    },
    async toggleLikeHandler(payload) {
      const { cid } = this.comment;
      const { data: { likeCount, isLike } } = payload;
      await this.updateComment({ cid, data: { likeCount } });

      const { likes } = this.user;
      if (isLike) likes.push(cid);
      else likes.splice(likes.indexOf(cid), 1);
      await this.updateUserData({ uid: this.uid, data: { likes } });
    },
  },
};
</script>
