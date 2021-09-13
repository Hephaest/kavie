export default {
  addComment: (state, payload) => {
    const { cid, comment } = payload;
    state.comments[cid].push(comment);
  },
  resetComments: (state, payload) => {
    const { cid } = payload;
    state.comments[cid] = [];
  },
};
