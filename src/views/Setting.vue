<template>
  <main class="container mx-auto p-8">
    <div class="flex md:flex-row md:items-start flex-col md:space-x-6 space-x-0 md:space-y-0 space-y-6">
      <div class="md:w-1/3 w-full">
        <upload-form />
      </div>
      <div class="md:w-2/3 w-full">
        <profile-card />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import UploadForm from '@/components/setting/UploadForm.vue';
import ProfileCard from '@/components/setting/ProfileCard.vue';

export default {
  name: 'Setting',
  components: {
    UploadForm,
    ProfileCard,
  },
  computed: {
    ...mapGetters({
      needConfirmUnsavedChange: 'states/needConfirmUnsavedChange',
    }),
  },
  beforeRouteLeave(to, from, next) {
    if (this.needConfirmUnsavedChange) {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const confirmLeaveWithUnsavedChanges = confirm(this.$t('warn.leaveWithoutSave'));
      next(confirmLeaveWithUnsavedChanges);
      return;
    }
    next();
  },
};
</script>
