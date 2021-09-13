<template>
  <router-link
    custom
    :to="{ name: 'track', params: { id: song.id }, query: { name: song.name, artists: song.artists } }"
    v-slot="{ navigate }"
  >
    <li
      class="flex flex-row justify-between items-center px-6 py-6 cursor-pointer transition
            duration-300 hover:bg-green-50"
      @click="navigate"
    >
      <div>
        <span class="font-bold block text-gray-600">{{ song.name }}</span>
        <span class="text-gray-500 text-sm">{{ song.artists }}</span>
      </div>

      <div class="text-3xl">
        <span class="rank-font" :class="rankingClass">{{ song.ranking }}</span>
      </div>
    </li>
  </router-link>
</template>

<script>
const rankStyle = (rank) => {
  if (rank === 1) {
    return 'text-yellow-400';
  }
  if (rank === 2) {
    return 'text-gray-400';
  }
  if (rank === 3) {
    return 'text-red-400';
  }
  // 5 ~ 10 ranking
  if (rank <= 10) {
    return 'text-red-300';
  }
  // 11 ~ 30 ranking
  if (rank <= 30) {
    return 'text-red-200';
  }
  // 31 ~ 50 ranking
  if (rank <= 50) {
    return 'text-red-100';
  }
  // 50 ~ 100 ranking
  return 'text-red-50';
};

export default {
  name: 'RankItem',
  props: ['song'],
  computed: {
    rankingClass() {
      return rankStyle(this.song.ranking);
    },
  },
};
</script>

<style scoped>
.first-rank {
  color: rgba(244, 213, 52, 1);
}

.second-rank {
  color: rgba(206, 205, 210, 1);
}

.third-rank {
  color: rgba(225, 148, 52, 1);
}
</style>
