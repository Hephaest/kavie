<template>
  <router-link
    custom
    :to="{ name: 'song', params: { id: song.sid } }"
    v-slot="{ navigate }"
  >
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
          duration-300 hover:bg-green-50"
    @click="navigate"
  >
    <div class="flex flex-col space-y-1">
      <span class="font-bold block text-gray-600">{{ song.modifiedName }}</span>
      <span class="text-gray-500 text-sm">{{ displayName }}</span>
    </div>
    <div class="flex flex-row items-center space-x-4">
      <span class="comments text-gray-400 text-lg hover:text-gray-500" >
        <i class="fas fa-heart"></i>
        {{ song.loveCount }}
      </span>
      <span class="comments text-gray-400 text-lg hover:text-gray-500" >
        <i class="fa fa-comments"></i>
        {{ song.commentCount }}
      </span>
    </div>
  </li>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SongItem',
  props: ['song'],
  data() {
    return {
      user: null,
    };
  },
  computed: {
    displayName() {
      return this.user ? this.user.name : '';
    },
  },
  async created() {
    const { uid } = this.song;
    this.user = await this.getUserData({ uid });
  },
  methods: {
    ...mapActions({
      getUserData: 'users/getUserData',
    }),
  },
};
</script>
