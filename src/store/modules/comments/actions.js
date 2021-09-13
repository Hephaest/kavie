import { commentsCollection } from '@/includes/firebase';

export default {
  async getComments({ commit }, payload) {
    const { sid } = payload;
    const docs = await commentsCollection.where('sid', '==', sid).get();
    // Clear first
    commit('resetComments');
    // Add new
    docs.forEach((doc) => commit('addComment', { doc }));
  },
  async addComment({ commit, rootState }, payload) {
    const { sid, data } = payload;
    const { uid } = rootState.auth.user;
    const comment = {
      content: data.comment,
      datePosted: new Date().toString(),
      sid,
      uid,
      likeCount: 0,
      followedComments: [],
    };
    const commentRef = await commentsCollection.add(comment);
    const doc = await commentRef.get();
    commit('addComment', { doc });
  },
  async updateComment({ commit }, payload) {
    const { cid, data } = payload;
    await commentsCollection.doc(cid).update(data);
    commit('updateComment', { cid, data });
  },
  async addFollowedComment({ commit }, payload) {
    const { cid, fid } = payload;
    const doc = await commentsCollection.doc(cid).get();
    const { followedComments } = doc.data();
    followedComments.push(fid);
    await commentsCollection.doc(cid).update({ followedComments });
    commit('addFollowedComment', { cid, fid });
  },
};
