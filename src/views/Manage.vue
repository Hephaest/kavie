<template>
  <section class="container mx-auto p-8">
    <div class="flex md:flex-row md:items-start flex-col md:space-x-6 space-x-0 md:space-y-0 space-y-6">
      <div class="md:w-1/3 w-full">
        <upload-form />
      </div>
      <div class="md:w-2/3 w-full">
        <manage-card :songs="songs"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UploadForm from '@/components/song/UploadForm.vue';
import ManageCard from '@/components/song/ManageCard.vue';

export default {
  name: 'Manage',
  components: {
    UploadForm,
    ManageCard,
  },
  computed: {
    ...mapGetters({
      getUserSongs: 'songs/getUserSongs',
      uid: 'auth/userId',
      needConfirmUnsavedChange: 'states/needConfirmUnsavedChange',
    }),
    songs() {
      return this.getUserSongs(this.uid);
    },
  },
  methods: {
    ...mapActions({
      getSongs: 'songs/getSongs',
    }),
  },
  async created() {
    await this.getSongs({ uid: this.uid });
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
