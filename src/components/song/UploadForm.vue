<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <span class="mx-6 pt-6 font-bold text-xl border-b-4 border-green-400 self-start">{{ $t('common.upload') }}</span>
    <div class="p-6 flex flex-col">
      <base-upload-form @upload-files="uploadHandler" type="multiple"/>
      <template v-if="uploadFiles.length">
        <hr class="my-6" />
        <!-- Progess Bars -->
        <file-progress-bar
          v-for="(file, i) in uploadFiles"
          :key="i"
          :file="file"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UploadForm',
  computed: {
    ...mapState({
      uploadFiles: (state) => state.songs.uploadFiles,
    }),
  },
  methods: {
    ...mapActions({
      uploadSong: 'songs/uploadSong',
      cancelFiles: 'songs/cancelUploadTasks',
    }),
    async uploadHandler(payload) {
      const { files } = payload;
      await this.uploadSong({ files });
    },
  },
  beforeUnmount() {
    this.cancelFiles();
  },
};
</script>
