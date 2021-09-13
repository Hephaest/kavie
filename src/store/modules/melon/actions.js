/* eslint-disable no-restricted-syntax */
import { melonAxios } from '@/includes/customAxios';

export default {
  async getSongs({ state, commit }, payload) {
    const { forceUpdate = false } = payload || {};
    const { choice, songs } = state;
    // Use cache songs.
    if (!forceUpdate && songs.length > 0) return songs;

    const { data } = await melonAxios.get(choice);
    const newSongs = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const song = {
          id: data[key].songId,
          name: data[key].name,
          artists: data[key].artists,
          ranking: +data[key].ranking,
        };
        newSongs.push(song);
      }
    }

    commit('setSongs', { songs: newSongs });
    return newSongs;
  },
  changeChoice({ commit }, payload) {
    commit('setChoice', payload);
  },
};
