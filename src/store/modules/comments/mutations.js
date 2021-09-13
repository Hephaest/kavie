export default {
  addComment: (state, payload) => {
    const { doc } = payload;
    const comment = {
      ...doc.data(),
      cid: doc.id,
    };
    state.comments.push(comment);
  },
  updateComment: (state, payload) => {
    const { cid, data } = payload;
    const idx = state.comments.findIndex((cmt) => cmt.cid === cid);
    state.comments[idx] = { ...state.comments[idx], ...data };
  },
  addFollowedComment: (state, payload) => {
    const { cid, fid } = payload;
    const idx = state.comments.findIndex((cmt) => cmt.cid === cid);
    state.comments[idx].followedComments.push(fid);
  },
  resetComments: (state) => {
    state.comments = [];
  },
};
