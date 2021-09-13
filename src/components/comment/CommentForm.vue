<template>
  <vee-form
    class="p-6"
    :validation-schema="schema"
    @submit="submitHandler"
  >
    <vee-field
      as="textarea"
      name="comment"
      :label="$t('common.comment')"
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
      :disabled="disabled"
      :placeholder="$t('comment.placeholder')"
    ></vee-field>
    <error-message class="text-red-600" name="comment" />
    <div v-if="errorMessage" class="py-1.5 px-3 text-red-500">{{errorMessage}}</div>
    <button
      type="submit"
      class="py-1.5 px-3 rounded text-white bg-green-400 block hover:bg-green-500"
      :disabled="disabled"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
const schema = {
  comment: 'required|min:3',
};

export default {
  name: 'CommentForm',
  props: {
    disabled: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Object,
      required: false,
    },
  },
  emits: ['submit'],
  data() {
    return {
      schema,
    };
  },
  computed: {
    errorMessage() {
      const { scene, msg } = this.error || {};
      if (scene !== 'comment') return null;
      return msg;
    },
  },
  methods: {
    submitHandler(formData, { resetForm }) {
      this.$emit('submit', { data: formData, action: resetForm });
    },
  },
};
</script>
