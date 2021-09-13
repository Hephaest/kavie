export default {
  setUser: (state, payload) => {
    const { uid, data } = payload;
    state.users[uid] = { ...data };
  },
  updateUser: (state, payload) => {
    const { uid, data } = payload;
    state.users[uid] = { ...state.users[uid], ...data };
  },
  resetUser: (state, payload) => {
    const { uid } = payload;
    state.users[uid] = {};
  },
};
