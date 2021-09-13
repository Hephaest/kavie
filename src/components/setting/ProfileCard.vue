<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col p-6">
    <span
      class="font-bold text-xl border-b-4 border-green-400 self-start"
      >{{ $t('setting.accountSettings') }}</span
    >
    <div class="pt-8 flex flex-col space-y-4 p-4">
      <!-- Alert Box -->
      <base-alert scene="updateProfile" :to="alertState" />
      <div class="flex md:flex-row flex-col md:space-x-8 space-x-0 md:space-y-0 space-y-6">
        <!-- Avatar -->
        <div class="flex flex-col space-y-4 justify-center items-center md:self-start self-center">
          <img :src="avatarURL" alt="User Avatar" class="w-32 h-32 rounded-full object-cover bg-white">
          <span>{{ $t('setting.profilePicture') }}</span>
          <base-button type="button" :disabled="avatarUploadDisabled" :text="$t('setting.savePhoto')" @click="saveAvatarHandler"/>
        </div>
        <!-- Divider -->
        <div class="md:border-l border-l-0 border-b md:border-b-0 border-gray-200 md:my-4 my-x-4 md: my-x-0"></div>
        <!-- User Info -->
        <edit-form class="flex-grow" :userData="userData" @submit="submitHandler" :disabled="editFormDisabled"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import EditForm from '@/components/setting/EditForm.vue';
import { getAuthErrorMessage, getStorageErrorMessage } from '@/utils/errors';

const checkDiffHandler = (oldData, newData) => {
  const diffs = {};
  Object.keys(newData)
    .filter((key) => key !== 'password' && key !== 'confirmPassword')
    .forEach((key) => {
      if (newData[key] === oldData[key]) return;
      diffs[key] = newData[key];
    });
  return diffs;
};

export default {
  name: 'ProfileCard',
  components: {
    EditForm,
  },
  data() {
    return {
      alertState: {
        name: 'idle',
        error: null,
      },
      userData: {},
      editFormDisabled: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    ...mapGetters({
      uploadAvatarURL: 'setting/avatarURL',
      uid: 'auth/userId',
      getUser: 'users/getUser',
    }),
    avatarURL() {
      // Undefined at first! need a guard!
      const user = this.getUser(this.uid);
      if (user) return this.uploadAvatarURL || user.avatarURL;
      return this.uploadAvatarURL || '/assets/img/vendor/user/avatar.svg';
    },
    avatarUploadDisabled() {
      return !this.uploadAvatarURL;
    },
  },
  methods: {
    ...mapActions({
      getUserData: 'users/getUserData',
      updateUserData: 'users/updateUserData',
      clearFile: 'setting/clearUploadFile',
      updateLocale: 'setting/updateLocale',
    }),
    stateChangeHandler(state) {
      this.alertState = state;
    },
    autoResetState() {
      setTimeout(() => {
        this.alertState = { name: 'idle', error: null };
      }, 3000);
    },
    async saveAvatarHandler() {
      this.alertState = { name: 'active' };
      try {
        await this.updateUserData({
          uid: this.uid,
          data: { avatarURL: this.uploadAvatarURL },
        });
        await this.clearFile();
        this.alertState = { name: 'resolved' };
        this.autoResetState();
      } catch (error) {
        const code = getStorageErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.alertState = { name: 'rejected', error: errorMsg };
      }
    },
    async submitHandler(payload) {
      this.alertState = { name: 'active' };
      this.editFormDisabled = true;
      const { formData } = payload;
      const data = checkDiffHandler(this.userData, formData);
      try {
        await this.updateAuthData(formData);
        await this.updateUserData({
          uid: this.uid,
          data,
        });
        this.changeLocaleHandler(formData.locale);
        this.alertState = { name: 'resolved' };
        this.autoResetState();
      } catch (error) {
        const code = getAuthErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.alertState = { name: 'rejected', error: errorMsg };
      } finally {
        this.editFormDisabled = false;
      }
    },
    async updateAuthData(formData) {
      if (!this.user) return;
      const { password: newPassword, email: newEmail } = formData;
      if (newPassword) await this.user.updatePassword(newPassword);
      if (newEmail) await this.user.updateEmail(newEmail);
    },
    changeLocaleHandler(locale) {
      if (!locale) return;
      this.updateLocale({ locale });
    },
  },
  async created() {
    this.userData = await this.getUserData({ uid: this.uid });
  },
};
</script>
