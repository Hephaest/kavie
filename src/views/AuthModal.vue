<template>
  <base-modal v-if="shouldShow" :subtitle="$t('brand.welcome')" @close="closeModalHandler">
    <template v-slot:body>
      <!-- Tabs -->
      <ul class="flex flex-wrap mb-4">
        <li class="flex-auto text-center">
          <a
            class="block rounded py-3 px-4 transition"
            :class="loginTabClasses"
            href="#"
            @click.prevent="switchTabHandler('login')"
            >{{ $t('common.login') }}</a
          >
        </li>
        <li class="flex-auto text-center">
          <a
            class="block rounded py-3 px-4 transition"
            :class="registerTabClasses"
            href="#"
            @click.prevent="switchTabHandler('register')"
            >{{ $t('common.signup') }}</a
          >
        </li>
      </ul>
      <!-- Alert Box -->
      <base-alert :scene="tab" :to="state" />
      <!-- Login Form -->
      <login-form
        v-if="tab === 'login'"
        :disabled="shouldDisable"
        @submit="loginHandler"
      />
      <!-- Registration Form -->
      <register-form
        v-else
        :disabled="shouldDisable"
        @submit="registerHandler"
      />
    </template>
  </base-modal>
</template>

<script>
import { mapActions } from 'vuex';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { getAuthErrorMessage } from '@/utils/errors';

const activeClasses = 'hover:text-white text-white bg-green-500';
const inactiveClasses = 'hover:text-green-400';

export default {
  name: 'AuthModal',
  components: {
    LoginForm,
    RegisterForm,
  },
  props: ['shouldShow'],
  emits: ['close'],
  data() {
    return {
      tab: 'login',
      loginTabClasses: activeClasses,
      registerTabClasses: inactiveClasses,
      state: {
        name: 'idle',
        error: null,
      },
    };
  },
  watch: {
    tab(newVal) {
      this.loginTabClasses =
        newVal === 'login' ? activeClasses : inactiveClasses;
      this.registerTabClasses =
        newVal === 'register' ? activeClasses : inactiveClasses;
      // Reset the alert box
      this.state = { name: 'idle', error: null };
    },
  },
  computed: {
    shouldDisable() {
      return this.state.name === 'active';
    },
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
      signUp: 'auth/signUp',
    }),
    switchTabHandler(tab) {
      if (tab === this.tab) return;
      this.tab = tab;
    },
    closeModalHandler() {
      this.$emit('close');
    },
    resetFormHandler({ action }) {
      setTimeout(() => {
        // Reset submit state
        this.state = { name: 'idle' };
        // Execute reset form action
        action();
        // Finally, automatically close the modal
        this.closeModalHandler();
      }, 1500);
    },
    async loginHandler(payload) {
      const { data, action } = payload;
      this.state = { name: 'active' };

      try {
        await this.signIn({ data });
        this.state = { name: 'resolved' };
        this.resetFormHandler({ action });
      } catch (error) {
        const code = getAuthErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.state = { name: 'rejected', error: errorMsg };
      }
    },
    async registerHandler(payload) {
      const { data, action } = payload;
      this.state = { name: 'active' };

      try {
        await this.signUp({ data });
        this.state = { name: 'resolved' };
        this.resetFormHandler({ action });
      } catch (error) {
        const code = getAuthErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.state = { name: 'rejected', error: errorMsg };
      }
    },
  },
};
</script>
