export default {
  userId: (state) => (state.user ? state.user.uid : null),
  user: (state) => state.user,
};
