<template>
    <!-- Upload Dropbox -->
    <div
      class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
              border-gray-400 text-gray-400 transition duration-500 hover:text-white
              hover:bg-green-300 hover:border-green-300 hover:border-solid"
      :class="{ 'bg-green-400 border-green-400 border-solid': isDragOver }"
      @drag.prevent.stop=""
      @dragstart.prevent.stop=""
      @dragend.prevent.stop="isDragOver = false"
      @dragover.prevent.stop="isDragOver = true"
      @dragenter.prevent.stop="isDragOver = true"
      @dragleave.prevent.stop="isDragOver = false"
      @drop.prevent.stop="uploadHandler"
    >
      <h5>{{ $t('common.uploadHint') }}</h5>
    </div>
    <label for="file" class="my-4 bg-green-400 p-2 text-white rounded-md flex flex-row items-center space-x-1 justify-center hover:bg-green-500 cursor-pointer">
      <input id="file" type="file" :multiple="isMultiple" @change="uploadHandler" class="hidden"/>
      <i class="fas fa-cloud-upload-alt"></i>
      <span>{{ $t('common.chooseFile') }}</span>
    </label>
</template>

<script>
export default {
  name: 'UploadForm',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  emits: ['upload-files'],
  data() {
    return {
      isDragOver: false,
    };
  },
  computed: {
    isMultiple() {
      return this.type === 'multiple';
    },
  },
  methods: {
    uploadHandler($event) {
      this.isDragOver = false;
      const files = $event.dataTransfer
        ? $event.dataTransfer.files
        : $event.target.files;
      this.$emit('upload-files', { files });
    },
  },
};
</script>
