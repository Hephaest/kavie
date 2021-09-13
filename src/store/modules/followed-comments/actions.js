import { followedCommentsCollection } from '@/includes/firebase';

export default {
  async getComments({ commit }, payload) {
    const { cid } = payload;
    const docs = await followedCommentsCollection.where('cid', '==', cid).get();
    // Clear first
    commit('resetComments', { cid });
    // Add new
    docs.forEach((doc) => {
      const comment = { ...doc.data() };
      commit('addComment', { cid, comment });
    });
  },
  async addComment({ commit, rootState }, payload) {
    const { cid, data } = payload;
    const { uid } = rootState.auth.user;
    const comment = {
      content: data.comment,
      datePosted: new Date().toString(),
      cid,
      uid,
    };
    commit('addComment', { cid, comment });
    const cmtRef = await followedCommentsCollection.add(comment);
    const doc = await cmtRef.get();
    return doc.id;
  },
};
