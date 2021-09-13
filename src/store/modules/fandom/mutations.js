export default {
  addFandom: (state, payload) => {
    const { fandom } = payload;
    state.fandoms.push({ ...fandom });
  },
};
