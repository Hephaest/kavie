<template>
  <!-- Alert Box -->
  <base-alert scene="updateSong" :to="alertState" />
  <div class="border border-gray-200 p-3 mb-4 rounded" :class="cardClass">
    <div
      v-show="!shouldFormShow"
      class="flex flex-row justify-between items-center"
      @click.prevent="toggleFormHandler"
    >
      <h4 class="inline-block text-lg font-bold">
        {{ song.modifiedName }}
      </h4>
      <i class="fas fa-angle-down text-gray-400 text-xl"></i>
    </div>
    <div v-show="shouldFormShow">
      <edit-form
        :key="song.sid"
        :song="song"
        :disabled="shouldDisable"
        @cancel="toggleFormHandler"
        @submit="updateHandler"
        @delete="deleteHandler"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditForm from '@/components/song/EditForm.vue';
import { getStorageErrorMessage } from '@/utils/errors';

export default {
  name: 'CollapseItem',
  components: { EditForm },
  props: {
    song: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ['state-change'],
  data() {
    return {
      alertState: {
        name: 'idle',
        error: null,
      },
      shouldFormShow: false,
    };
  },
  computed: {
    shouldDisable() {
      return this.alertState.name === 'active';
    },
    cardClass() {
      return !this.shouldFormShow ? 'hover:bg-gray-50 cursor-pointer' : '';
    },
  },
  watch: {
    shouldFormShow(newValue) {
      if (newValue) return;
      this.alertState = { name: 'idle', error: null };
    },
  },
  methods: {
    ...mapActions({
      updateSong: 'songs/updateSong',
      deleteSong: 'songs/deleteSong',
    }),
    toggleFormHandler() {
      this.shouldFormShow = !this.shouldFormShow;
    },
    async updateHandler(payload) {
      const { data } = payload;
      this.alertState = { name: 'active' };

      try {
        await this.updateSong({
          sid: this.song.sid,
          data,
        });
        this.alertState = { name: 'resolved' };
        // Auto collapse
        setTimeout(() => {
          this.toggleFormHandler();
        }, 1500);
      } catch (error) {
        const code = getStorageErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.alertState = { name: 'rejected', error: errorMsg };
      }
    },
    async deleteHandler() {
      try {
        await this.deleteSong({ index: this.index, song: this.song });
        this.$emit('state-change', { name: 'resolved' });
        setTimeout(() => {
          this.$emit('state-change', { name: 'idle' });
        }, 1500);
      } catch (error) {
        const code = getStorageErrorMessage(error);
        const errorMsg = this.$t(`error.${code}`);
        this.$emit('state-change', { name: 'rejected', error: errorMsg });
      }
    },
  },
};
</script>
