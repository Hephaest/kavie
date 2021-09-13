export default {
  avatarURL: (state) => (state.uploadFile ? state.uploadFile.url : null),
};
