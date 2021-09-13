export default {
  comment: (state) => (cid) => (state.comments[cid] ? state.comments[cid].slice().sort((a, b) => b.datePosted - a.datePosted) : null),
};
