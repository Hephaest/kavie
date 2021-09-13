<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col p-6">
    <span
      class="font-bold text-xl border-b-4 border-green-400 self-start"
      >{{ $t('manage.songManagement') }}</span
    >
    <div class="pt-6">
      <template v-if="songs.length">
        <!-- Alert Box -->
        <base-alert scene="deleteSong" :to="alertState" />
        <!-- Composition Items -->
        <collapse-item
          v-for="(song, i) in songs"
          :key="song.sid"
          :song="song"
          :index="i"
          @state-change="stateChangeHandler"
        />
      </template>
      <empty-card v-else :title="$t('manage.emptySong')"/>
    </div>
  </div>
</template>

<script>
import CollapseItem from '@/components/song/CollapseItem.vue';
import EmptyCard from '@/components/ui/cards/EmptyCard.vue';

export default {
  name: 'ManageCard',
  components: {
    CollapseItem,
    EmptyCard,
  },
  props: {
    songs: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      alertState: {
        name: 'idle',
        error: null,
      },
    };
  },
  methods: {
    stateChangeHandler(state) {
      this.alertState = state;
    },
  },
};
</script>
