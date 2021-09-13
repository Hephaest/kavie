<template>
  <div class="mb-4 flex flex-col">
    <!-- File Name -->
    <div class="font-medium text-sm flex flex-row space-x-1 items-center" :class="textClass">
      <span>{{ file.name }}</span>
      <i class="fas" :class="iconClass"></i>
    </div>
    <div class="flex flex-row space-x-2 text-sm items-center justify-between">
      <div class="flex-grow h-4 overflow-hidden bg-gray-200 rounded">
        <!-- Inner Progress Bar -->
        <div
          class="h-full"
          :class="innerBarClass"
          :style="innerBarStyle"
        ></div>
      </div>
      <!-- Percentage Number -->
      <span class="text-gray-400">{{ percentage }}</span>
    </div>
    <span v-if="file.errorCode" class="text-sm text-red-400">{{ errorMsg }}</span>
  </div>
</template>

<script>
const classes = {
  idle: {
    bar: 'bg-gray-200',
    text: 'text-gray-400',
    icon: 'fa-spinner fa-spin',
  },
  active: {
    bar: 'transition-all progress-bar bg-blue-400',
    text: 'text-gray-400',
    icon: 'fa-spinner fa-spin',
  },
  aborted: {
    bar: 'bg-red-400',
    text: 'text-red-400',
    icon: 'fa-times',
  },
  completed: {
    bar: 'bg-green-100',
    text: 'text-green-400',
    icon: 'fa-check',
  },
};

export default {
  name: 'ProgressBar',
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    percentage() {
      return `${this.file.progress.toFixed(0)}%`;
    },
    innerBarClass() {
      return classes[this.file.state].bar;
    },
    innerBarStyle() {
      return { width: `${this.file.progress}%` };
    },
    textClass() {
      return classes[this.file.state].text;
    },
    iconClass() {
      return classes[this.file.state].icon;
    },
    errorMsg() {
      return this.$t(`error.${this.file.errorCode}`);
    },
  },
};
</script>
