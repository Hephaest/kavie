export default {
  getSong: (state) => (sid) => state.songs.find((song) => song.sid === sid),
  getUserSongs: (state) => (uid) => state.songs.filter((song) => song.uid === uid),
  getUploadFile: (state) => (idx) => state.uploadFiles[idx],
};
