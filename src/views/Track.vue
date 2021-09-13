<template>
  <main class="flex flex-col">
    <div class="flex-grow container mx-auto pb-8 flex flex-col">
      <!-- Spinner -->
      <base-spinner class="my-auto self-center" v-if="shouldShowSpinner" />
      <!-- Error -->
      <not-found-card v-else-if="shouldShowError"></not-found-card>
      <!-- Track Details -->
      <template v-else>
        <!-- Album Info -->
        <base-card><template v-slot:content><album-item :album="song.album"/></template></base-card>
        <!-- Track Info -->
        <base-card><template v-slot:content><track-card :track="song.track" /></template></base-card>
        <!-- Artists Info -->
        <base-card>
          <template v-slot:content>
            <base-headline :title="$t('track.artists', song.artists.length)"/>
            <div class="grid md:grid-cols-3 grid-cols-2 grid-flow-row gap-4">
              <artist-item v-for="artist in song.artists" :artist="artist" :key="artist.id"/>
            </div>
          </template>
        </base-card>
        <!-- Top Tracks -->
        <template v-if="shouldShowTracks">
          <base-card v-for="{ artist, tracks } in topTracks" :key="artist">
            <template v-slot:content>
              <base-headline :title="$tc('track.topTracksOfArtist', { artist })" borderColor="border-blue-400"/>
              <div class="grid md:grid-cols-3 grid-cols-2 grid-flow-row gap-4">
                <track-item v-for="track in tracks" :key="track.id" :track="track"/>
              </div>
            </template>
          </base-card>
        </template>
        <!-- Fanbase -->
        <template v-if="shouldShowFanbases">
          <base-card v-for="fanbase in fanbases" :key="fanbase.id">
            <template v-slot:content>
              <!-- Fanbase Headline -->
              <base-headline :title="$t('track.fandomOfArtist', { artist: fanbase.owner.name })" borderColor="border-purple-400" />
              <div class="flex lg:flex-row flex-col">
                <!-- Third Party Card -->
                <template v-if="fanbase.lightStick">
                  <share-card :vendors="fanbase.lightStick"/>
                </template>
                <!-- Fanbase Info -->
                <div class="flex flex-col lg:ml-2 mt-3 rubik-font">
                  <!-- Basic Info -->
                  <base-border class="overflow-hidden"><template v-slot:content><chat-card :fanbase="fanbase"/></template></base-border>
                  <!-- Social Media -->
                  <base-border v-if="fanbase.medias" class="mt-4"><template v-slot:content><social-card :medias="fanbase.medias"/></template></base-border>
                </div>
              </div>
            </template>
          </base-card>
        </template>
      </template>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import AlbumItem from '@/components/track/AlbumItem.vue';
import TrackItem from '@/components/track/TrackItem.vue';
import ArtistItem from '@/components/track/ArtistItem.vue';
import TrackCard from '@/components/track/DetailCard.vue';
import ShareCard from '@/components/fanbase/ShareCard.vue';
import ChatCard from '@/components/fanbase/ChatCard.vue';
import SocialCard from '@/components/fanbase/SocialCard.vue';

export default {
  name: 'Track',
  components: {
    AlbumItem,
    TrackItem,
    ArtistItem,
    TrackCard,
    ShareCard,
    ChatCard,
    SocialCard,
  },
  data() {
    return {
      song: null,
      topTracks: null,
      fanbases: null,
      shouldShowSpinner: true,
      shouldShowError: false,
    };
  },
  computed: {
    shouldShowTracks() {
      return this.topTracks && this.topTracks.length > 0;
    },
    shouldShowFanbases() {
      return this.fanbases && this.fanbases.length > 0;
    },
  },
  methods: {
    ...mapActions({
      getSongDetailsByQuery: 'spotify/getSongDetailsByQuery',
      getArtistTopTracksById: 'spotify/getArtistTopTracksById',
      getFandoms: 'fandom/getFandoms',
    }),
    getArtistImgUrl(url) {
      return url || '/assets/img/errors/user.svg';
    },
  },
  async created() {
    const { name, artists } = this.$route.query;

    try {
      this.song = await this.getSongDetailsByQuery({ name, artists });

      if (!(this.song && this.song.artists)) {
        this.shouldShowSpinner = false;
        return;
      }

      const artistTopTracksPromises = this.song.artists.map(async (artist) => ({
        artist: artist.name,
        tracks: await this.getArtistTopTracksById({ id: artist.id }),
      }));

      this.topTracks = await Promise.all(artistTopTracksPromises);

      const payload = this.song.artists.map(({ id, imageUrl }) => ({ id, imageUrl }));
      this.fanbases = await this.getFandoms(payload);
    } catch (error) {
      this.shouldShowError = true;
    } finally {
      this.shouldShowSpinner = false;
    }
  },
};
</script>
