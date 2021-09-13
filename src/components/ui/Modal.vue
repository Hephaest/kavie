<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 text-center
      sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!-- Heading -->
          <div class="flex justify-between items-center pb-4">
            <!--Title-->
            <p class="text-2xl font-bold flex-grow text-center" v-if="shouldShowTitle">{{ title }}</p>
            <!--Logo-->
            <p class="text-green-400 font-bold text-5xl mr-4 flex-grow text-center" style="font-family: 'Kalam'" v-else>{{ $t('brand.name') }}</p>
            <!-- Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              v-if="shouldShowCloseButton"
              @click.prevent="closeModalHandler"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- Subtitle -->
          <div class="flex justify-between items-center pb-4" v-if="shouldShowSubtitle">
            <!--Text-->
            <p class="text-lg font-bold flex-grow text-center text-gray-400">{{ subtitle }}</p>
          </div>

          <!--Body-->
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    shouldShowCloseButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: ['close'],
  computed: {
    shouldShowTitle() {
      return this.title.length > 0;
    },
    shouldShowSubtitle() {
      return this.subtitle.length > 0;
    },
  },
  methods: {
    closeModalHandler() {
      this.$emit('close');
    },
  },
};
</script>
