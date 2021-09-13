<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <span class="mx-6 pt-6 font-bold text-xl border-b-4 border-green-400 self-start">{{ $t('common.upload') }}</span>
    <div class="p-6 flex flex-col">
      <base-upload-form @upload-files="uploadHandler" type="single"/>
      <template v-if="uploadFile">
        <hr class="my-6" />
        <!-- Progess Bars -->
        <file-progress-bar :file="uploadFile"/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UploadForm',
  data() {
    return {
      isDragOver: false,
    };
  },
  computed: {
    ...mapState({
      uploadFile: (state) => state.setting.uploadFile,
    }),
  },
  methods: {
    ...mapActions({
      uploadAvatar: 'setting/uploadAvatar',
      cancelUpload: 'setting/cancelUploadTask',
    }),
    async uploadHandler(payload) {
      const { files } = payload;
      const file = files[0];
      await this.uploadAvatar({ file });
    },
  },
  beforeUnmount() {
    this.cancelUpload();
  },
};
</script>
