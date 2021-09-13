<template>
  <vee-form
    class="flex flex-col space-y-4"
    :validation-schema="schema"
    :initial-values="userData"
    @submit="registerHandler"
  >
    <!-- Name -->
    <vee-input
      type="text"
      name="name"
      :disabled="disabled"
      :placeholder="$t('placeholder.name')"
      :label="$t('common.name')"
    />
    <!-- Email -->
    <vee-input
      type="email"
      name="email"
      :disabled="disabled"
      :placeholder="$t('placeholder.email')"
      :label="$t('common.email')"
    />
    <!-- Age -->
    <vee-input
      type="number"
      name="age"
      :disabled="disabled"
      :placeholder="$t('placeholder.age')"
      :label="$t('common.age')"
    />
    <!-- Password -->
    <vee-input
      type="password"
      name="password"
      :disabled="disabled"
      :placeholder="$t('placeholder.password')"
      :label="$t('common.password')"
      errorType="multiple"
    />
    <!-- Confirm Password -->
    <vee-input
      type="password"
      name="confirmPassword"
      :disabled="disabled"
      :placeholder="$t('placeholder.confirmPassword')"
      :label="$t('auth.confirmPassword')"
    />
    <!-- Locale -->
    <vee-select
      name="locale"
      :disabled="disabled"
      :label="$t('common.preferredLanguage')"
      :options="locales"
    />
    <!-- TOS -->
    <vee-checkbox name="tos" :label="$t('common.tos')" value="1" :disabled="disabled" class="pl-6">
      <i18n-t class="inline-block" keypath="term.accept" tag="label">
        <a href="#">{{ $t('common.tos') }}</a>
      </i18n-t>
    </vee-checkbox>
    <!-- Button -->
    <base-button
      type="submit"
      :disabled="disabled"
      :text="$t('common.submit')"
    />
  </vee-form>
</template>

<script>
import VeeCheckbox from '@/components/ui/vees/VeeCheckbox.vue';
import locales from '@/utils/locales';

const schema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:6|max:50|email',
  age: 'required|min_value:18|max_value:100',
  password: 'required|min:6|max:20',
  confirmPassword: 'required|password_confirmed:@password',
  locale: 'required',
  tos: 'required',
};

const userData = {
  locale: 'en',
};

export default {
  name: 'RegisterForm',
  components: {
    VeeCheckbox,
  },
  props: ['disabled'],
  emits: ['submit'],
  data() {
    return {
      userData,
      schema,
      locales,
    };
  },
  methods: {
    registerHandler(formData, { resetForm }) {
      this.$emit('submit', { data: formData, action: resetForm });
    },
  },
};
</script>
