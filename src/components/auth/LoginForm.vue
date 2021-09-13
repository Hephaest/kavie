<template>
  <vee-form :validation-schema="schema" @submit="loginHandler" class="flex flex-col space-y-4">
    <!-- Email -->
    <vee-input
      type="email"
      name="email"
      :disabled="disabled"
      :placeholder="$t('placeholder.email')"
      :label="$t('common.email')"
    />
    <!-- Password -->
    <vee-input
      type="password"
      name="password"
      :disabled="disabled"
      :placeholder="$t('placeholder.password')"
      :label="$t('common.password')"
    />
    <!-- Button -->
    <base-button
      type="submit"
      :disabled="disabled"
      :text="$t('common.login')"
    />
  </vee-form>
</template>

<script>
const schema = {
  email: 'required|min:6|max:50|email',
  password: 'required|min:6|max:20',
};

export default {
  name: 'LoginForm',
  props: ['disabled'],
  emits: ['submit'],
  data() {
    return {
      schema,
    };
  },
  methods: {
    loginHandler(formData, { resetForm }) {
      this.$emit('submit', { data: formData, action: resetForm });
    },
  },
};
</script>
