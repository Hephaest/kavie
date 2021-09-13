export default {
  getUser: (state) => (uid) => state.users[uid],
};
