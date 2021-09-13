<template>
  <main>
    <!-- Background -->
    <section class="mb-8 w-full h-full bg-cover bg-center forum-bg">
    </section>
    <!-- Main Content -->
    <section class="container mx-auto mt-6 pb-8">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-alt="{ icon: 'seedling', right: true }"
        >
          <span class="text-2xl">{{ $t('forum.playlist') }}</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.sid" :song="song" />
        </ol>
        <!-- End Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import SongItem from '@/components/forum/SongItem.vue';
import IconAlt from '@/directives/icon-alt';

export default {
  name: 'Forum',
  components: {
    SongItem,
  },
  directives: {
    'icon-alt': IconAlt,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 30,
      pendingRequests: false,
    };
  },
  async created() {
    this.getSongs();
    window.addEventListener('scroll', this.playlistScrollHandler);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.playlistScrollHandler);
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) return;
      this.pendingRequest = true;

      let docs;
      if (this.songs.length > 0) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].sid)
          .get();
        docs = await songsCollection
          .orderBy('modifiedName')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        docs = await songsCollection
          .orderBy('modifiedName')
          .limit(this.maxPerPage)
          .get();
      }

      docs.forEach((doc) => {
        this.songs.push({
          sid: doc.id,
          ...doc.data(),
        });
      });

      this.pendingRequest = false;
    },
    playlistScrollHandler() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const isAtWindowBottom =
        Math.round(scrollTop) + innerHeight === offsetHeight;
      if (isAtWindowBottom) {
        this.getSongs();
      }
    },
  },
};
</script>
