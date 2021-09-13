export default {
  setAccessToken: (state, payload) => {
    const { accessToken } = payload;
    state.accessToken = accessToken;
  },
};
