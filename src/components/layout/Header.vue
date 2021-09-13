<template>
  <header id="header" class="bg-gray-700">
    <nav class="mx-auto flex justify-between items-center py-4 px-6">
      <!-- App Name -->
      <router-link
        class="text-white font-bold sm:text-4xl text-xl mr-4 brand-font"
        exact-active-class="no-active"
        :to="{ name: 'home' }"
        >{{ $t('brand.name') }}</router-link
      >

      <div class="flex items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1 items-center text-white sm:text-base text-sm sm:space-x-4  space-x-2">
          <!-- Navigation Links -->
          <li>
            <router-link :to="{ name: 'about' }">{{
              $t('common.about')
            }}</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'forum' }">{{
              $t('common.forum')
            }}</router-link>
          </li>
          <template v-if="hasUserLoggedIn">
            <li>
              <router-link :to="{ name: 'manage' }">{{
                $t('common.manage')
              }}</router-link>
            </li>
            <li class="z-20 relative min-w-max">
              <transition name="fade">
              <img
                class="h-12 w-12 border-2 cursor-pointer rounded-full bg-white object-cover"
                :class="userAvatarClass"
                :src="avatarURL"
                alt="User Avatar"
                @click="toggleMenuHandler"
              />
              </transition>
              <div v-if="shouldShowUserMenu" class="absolute right-0 mt-1.5">
                <div class="bubble">
                  <ul
                  class="flex flex-col shadow-2xl rounded-md bg-gray-500 min-w-max text-white text-center overflow-hidden"
                  >
                    <li class="relative pt-2 px-2 pb-1 hover:bg-gray-400">
                      <router-link class="hover:text-white" :to="{ name: 'setting' }">{{
                        $t('common.settings')
                      }}</router-link>
                    </li>
                    <li class="relative px-2 pb-2 pt-1 hover:bg-gray-400">
                      <a
                        href="#"
                        class="hover:text-white"
                        @click="logoutHandler"
                        >{{ $t('common.logout') }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </template>
          <li v-else>
            <a class="px-2 text-white" href="#" @click.prevent="entryHandler"
              >{{ $t('common.login') }} / {{ $t('common.signup') }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    hasMaskShown: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['show-auth-modal', 'show-mask', 'hide-mask'],
  data() {
    return {
      shouldShowUserMenu: false,
    };
  },
  computed: {
    ...mapState({ hasUserLoggedIn: (state) => state.auth.hasUserLoggedIn }),
    ...mapGetters({
      uid: 'auth/userId',
      getUser: 'users/getUser',
    }),
    userAvatarClass() {
      return this.shouldShowUserMenu ? 'border-green-400' : 'border-gray-700';
    },
    avatarURL() {
      const user = this.getUser(this.uid);
      if (user) return user.avatarURL;
      return '/assets/img/vendor/user/avatar.svg';
    },
  },
  watch: {
    shouldShowUserMenu(newVale) {
      if (newVale) this.$emit('show-mask');
      else this.$emit('hide-mask');
    },
    hasMaskShown(newVal) {
      // Mask diappear when user menu is hidden
      if (!newVal) this.shouldShowUserMenu = false;
    },
  },
  methods: {
    ...mapActions({
      logoutHandler: 'auth/signOut',
    }),
    entryHandler() {
      this.$emit('show-auth-modal');
    },
    toggleMenuHandler() {
      this.shouldShowUserMenu = !this.shouldShowUserMenu;
    },
  },
};
</script>

<style scoped>
.bubble {
  position: relative;
}

.bubble:after {
  content: '';
  position: absolute;
  top: 0px;
  right: 5px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: rgba(107, 114, 128, 1);
  border-top: 0;
  margin-left: -8px;
  margin-top: -8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
