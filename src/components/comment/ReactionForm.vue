<template>
  <div
    class="flex flex-row items-center justify-between mt-4 text-lg space-x-8 text-gray-400 font-light"
  >
    <!-- Thumbs up -->
    <span class="flex flex-row space-x-2 items-center">
      <i
        class="fa-thumbs-up"
        :class="thumbUpClass"
        @click="toggleThumbHandler"
      ></i>
      <span>{{ likeCount }}</span>
    </span>
    <!-- Follow comments -->
    <span class="flex flex-row space-x-2 items-center">
      <i
        class="fa-comment-dots"
        :class="commentClass"
        @click="toggleCommentHandler"
      ></i>
      <span>{{ commentCount }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ReactionForm',
  props: {
    comment: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: false,
      default: null,
    },
    commentCount: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  emits: ['toggle-like', 'toggle-comments'],
  data() {
    return {
      hasThumbedUp: false,
      hasCommentExpanded: false,
      likeCount: 0,
    };
  },
  computed: {
    thumbUpClass() {
      return this.hasThumbedUp ? 'fas pulse cursor-pointer' : 'far';
    },
    commentClass() {
      const iconClass = this.hasCommentExpanded ? 'fas' : 'far';
      const cursorClass = this.commentCount === 0 && this.disabled ? '' : 'cursor-pointer';
      return `${iconClass} ${cursorClass}`;
    },
  },
  methods: {
    toggleThumbHandler() {
      if (this.disabled) return;
      this.hasThumbedUp = !this.hasThumbedUp;
      this.likeCount += this.hasThumbedUp ? 1 : -1;
      this.$emit('toggle-like', {
        data: {
          likeCount: this.likeCount,
          isLike: this.hasThumbedUp,
        },
      });
    },
    toggleCommentHandler() {
      if (this.commentCount === 0 && this.disabled) return;
      this.hasCommentExpanded = !this.hasCommentExpanded;
      this.$emit('toggle-comments', { shouldCommentsShow: this.hasCommentExpanded });
    },
  },
  created() {
    const { cid, likeCount } = this.comment;
    this.likeCount = likeCount;

    if (!this.user) return;
    this.hasThumbedUp = this.user.likes.includes(cid);
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
