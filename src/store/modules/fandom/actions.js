import { fanbasesCollection } from '@/includes/firebase';

export default {
  async getFandom({ commit }, payload) {
    const { id, imageUrl } = payload;
    const doc = await fanbasesCollection.doc(id).get();
    if (doc.exists) {
      const fandom = { id, imageUrl, ...doc.data() };
      commit('addFandom', fandom);
      return fandom;
    }
    return null;
  },

  // Get cached fandoms
  async getFandoms({ dispatch, state }, payload) {
    const promises = payload.map(async ({ id, imageUrl }) => {
      const fandom = state.fandoms.find((fm) => fm.id === id);
      if (!fandom) {
        return dispatch('getFandom', { id, imageUrl });
      }
      return { ...fandom };
    });
    // Filter out null objects
    const fandoms = await Promise.all(promises);
    return fandoms.filter((value) => !!value);
  },
};
