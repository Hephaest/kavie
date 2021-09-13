<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- Mask -->
    <div
      class="absolute bg-transparent z-10"
      :class="maskClass"
      @click.prevent="hideMaskHandler"
    ></div>
    <!-- Header -->
    <app-header
      :hasMaskShown="shouldShowMask"
      @show-mask="showMaskHandler"
      @hide-mask="hideMaskHandler"
      @show-auth-modal="showAuthModalHandler"
    />
    <!-- Main -->
    <router-view v-slot="{ Component }" class="flex-grow">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <!-- Player -->
    <transition name="pop" mode="out-in">
      <app-player v-if="hasSound" />
    </transition>
    <!-- Auth Modal -->
    <auth-modal
      :shouldShow="shouldAuthModalShow"
      @close="closeAuthModalHandler"
    />
    <!-- Footer -->
    <app-footer />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { setLocale } from '@vee-validate/i18n';

import AuthModal from './views/AuthModal.vue';
import AppHeader from './components/layout/Header.vue';
import AppFooter from './components/layout/Footer.vue';
import AppPlayer from './components/ui/progress-bars/PlayerBar.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
    AppFooter,
  },
  data() {
    return {
      shouldShowMask: false,
      shouldAuthModalShow: false,
    };
  },
  computed: {
    ...mapState({
      hasUserLoggedIn: (state) => state.auth.hasUserLoggedIn,
      locale: (state) => state.setting.locale,
    }),
    ...mapGetters({
      hasSound: 'audio/hasSound',
    }),
    maskClass() {
      return this.shouldShowMask ? 'inset-0' : '';
    },
  },
  watch: {
    hasUserLoggedIn(newValue) {
      // Redircect
      const needAuthRequired = this.$route.meta.authRequired;
      if (!newValue && needAuthRequired) {
        this.$router.push({ name: 'home' });
      }
    },
    locale(newValue) {
      this.$root.$i18n.locale = newValue;
      setLocale(newValue);
    },
  },
  async created() {
    await this.autoLogin();
    this.$root.$i18n.locale = this.locale;
    setLocale(this.locale);
  },
  methods: {
    ...mapActions({
      autoLogin: 'auth/autoLogin',
    }),
    showMaskHandler() {
      this.shouldShowMask = true;
    },
    hideMaskHandler() {
      this.shouldShowMask = false;
    },
    showAuthModalHandler() {
      this.shouldAuthModalShow = true;
    },
    closeAuthModalHandler() {
      this.shouldAuthModalShow = false;
    },
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}

.pop-enter-from {
  transform: translateY(200%);
}

.pop-enter-active {
  transition: all 0.5s ease-out;
}

.pop-leave-to {
  transform: translateY(0);
}
</style>
