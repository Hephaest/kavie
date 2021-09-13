<template>
  <vee-form
    ref="form"
    :validation-schema="schema"
    :initial-values="song"
    @submit="submitHandler"
  >
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('song.title') }}</label>
      <vee-field
        name="modifiedName"
        :label="$t('song.title')"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
        :disabled="disabled"
        placeholder="Enter Song Title"
        @input="editHandler"
      />
      <error-message class="text-red-600" name="modifiedName" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('song.genre') }}</label>
      <vee-field
        name="genre"
        :label="$t('song.genre')"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
        :disabled="disabled"
        placeholder="Enter Genre"
        @input="editHandler"
      />
      <error-message class="text-red-600" name="genre" />
    </div>
    <div class="flex flex-row justify-between">
      <div class="flex flex-row space-x-2">
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-blue-400 hover:bg-blue-500"
          :disabled="disabled"
        >
          {{ $t('common.update') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-red-400 hover:bg-red-500"
          :disabled="disabled"
          @click.prevent="deleteHandler"
        >
          {{ $t('common.delete') }}
        </button>
      </div>
      <button type="button" @click.prevent="cancelHandler">
        <i class="fas fa-angle-up text-gray-400 text-xl py-1 px-3"></i>
      </button>
    </div>
  </vee-form>
</template>

<script>
import { mapActions } from 'vuex';
import states from '@/utils/states';

const schema = {
  modifiedName: 'min:1|max:100',
  genre: 'max:50',
};

export default {
  name: 'EditForm',
  props: {
    song: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['submit', 'delete', 'cancel'],
  data() {
    return {
      schema,
      state: states.unchanged,
    };
  },
  methods: {
    ...mapActions({
      updateState: 'states/updateEditState',
    }),
    async submitHandler(formData) {
      this.$emit('submit', { data: formData });
      this.state = states.saved;
      this.updateState({ state: states.saved });
    },
    editHandler() {
      if (this.state === states.editing) return;
      this.state = states.editing;
      this.updateState({ state: states.editing });
    },
    cancelHandler() {
      if (this.state === states.editing) {
        // eslint-disable-next-line no-alert, no-restricted-globals
        const confirmLeaveWithUnsavedChanges = confirm(this.$t('warn.leaveWithoutSave'));
        if (!confirmLeaveWithUnsavedChanges) return;
        // reset the form
        this.state = states.unchanged;
        this.updateState({ state: states.unchanged });
        this.$refs.form.resetForm();
      }
      this.$emit('cancel');
    },
    deleteHandler() {
      this.$emit('delete');
    },
  },
  created() {
    this.updateState({ state: states.unchanged });
  },
};
</script>
