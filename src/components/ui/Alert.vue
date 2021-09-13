<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="message"
    :class="state.classes"
  >
    {{ message }}
  </div>
</template>

<script>
const states = {
  idle: {
    name: 'idle',
    classes: '',
  },
  active: {
    name: 'active',
    classes: 'bg-blue-400',
  },
  rejected: {
    name: 'rejected',
    classes: 'bg-red-400',
  },
  resolved: {
    name: 'resolved',
    classes: 'bg-green-400',
  },
};

export default {
  name: 'Alert',
  props: {
    scene: {
      type: String,
      required: true,
    },
    to: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      state: states.idle,
      message: null,
    };
  },
  watch: {
    to(newValue) {
      const { name, error } = newValue;
      const newState = { ...states[name] };

      let message = null;
      if (name !== 'idle') message = this.$t(`state.${name}.${this.scene}`);
      if (name === 'rejected' && error) message = error;

      this.state = { ...states[newState.name] };
      this.message = message;
    },
  },
};
</script>
