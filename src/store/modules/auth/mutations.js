export default {
  toggleAuthState: (state) => {
    state.hasUserLoggedIn = !state.hasUserLoggedIn;
  },
  resetUser: (state) => { state.user = null; },
  setUser: (state, user) => { state.user = user; },
};
