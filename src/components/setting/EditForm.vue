<template>
  <vee-form
    ref="form"
    class="flex flex-col space-y-4"
    :validation-schema="schema"
    :initial-values="userData"
    @submit="submitHandler"
  >
    <!-- Name -->
    <vee-input
      type="text"
      name="name"
      :disabled="disabled"
      :label="$t('common.name')"
      @input="editHandler"
    />
    <!-- Email -->
    <vee-input
      type="email"
      name="email"
      :disabled="disabled"
      :label="$t('common.email')"
      @input="editHandler"
    />
    <!-- Locale -->
    <vee-select
      name="locale"
      :disabled="disabled"
      :label="$t('common.preferredLanguage')"
      :options="locales"
      @change="editHandler"
    />
    <!-- Password -->
    <div class="border border-gray-200 p-3 mb-4 rounded" :class="cardClass">
      <div
        v-if="!shouldPasswordFormShow"
        class="flex flex-row justify-between items-center"
        @click.prevent="toggleFormHandler"
      >
        <h4 class="inline-block text-base">
          {{ $t('common.changePassword') }}
        </h4>
        <i class="fas fa-angle-down text-gray-400 text-xl"></i>
      </div>
      <div v-else class="flex flex-col space-y-2 justify-start">
        <!-- New Password -->
        <vee-input
          class="flex-grow"
          type="password"
          name="password"
          :disabled="disabled"
          :placeholder="$t('placeholder.newPassword')"
          :label="$t('setting.newPassword')"
          errorType="multiple"
          @input="editHandler"
        />
        <!-- Confirm New Password -->
        <vee-input
          class="flex-grow"
          type="password"
          name="confirmPassword"
          :disabled="disabled"
          :placeholder="$t('placeholder.newPasswordConfirm')"
          :label="$t('auth.confirmNewPassword')"
          @input="editHandler"
        />
        <button type="button" @click.prevent="toggleFormHandler" class="self-end">
          <i class="fas fa-angle-up text-gray-400 text-xl py-1 px-3"></i>
        </button>
      </div>
    </div>
    <!-- Button -->
    <base-button
      type="submit"
      :disabled="shouldDisableSubmitButton"
      :text="$t('common.updateProfile')"
    />
  </vee-form>
</template>

<script>
import { mapActions } from 'vuex';
import locales from '@/utils/locales';
import states from '@/utils/states';

const fullSchema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:6|max:50|email',
  password: 'required|min:6|max:20',
  confirmPassword: 'required|password_confirmed:@password',
  locale: 'required',
};

const partialSchema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:6|max:50|email',
  locale: 'required',
};

export default {
  name: 'EditForm',
  props: {
    userData: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit'],
  data() {
    return {
      locales,
      shouldPasswordFormShow: false,
      state: states.unchanged,
    };
  },
  computed: {
    cardClass() {
      return !this.shouldPasswordFormShow ? 'hover:bg-gray-50 cursor-pointer' : '';
    },
    schema() {
      return this.shouldPasswordFormShow ? fullSchema : partialSchema;
    },
    shouldDisableSubmitButton() {
      return this.disabled || this.state === states.unchanged || this.state === states.saved;
    },
  },
  methods: {
    ...mapActions({
      updateState: 'states/updateEditState',
    }),
    toggleFormHandler() {
      this.shouldPasswordFormShow = !this.shouldPasswordFormShow;
    },
    submitHandler(formData) {
      this.state = states.saved;
      this.updateState({ state: states.saved });
      this.$emit('submit', { formData });
    },
    editHandler() {
      if (this.state === states.editing) return;
      this.state = states.editing;
      this.updateState({ state: states.editing });
    },
  },
  created() {
    this.updateState({ state: states.unchanged });
  },
};
</script>
