export default {
  clearSongs(state) {
    // Remove all elements from the array and will actually clean the original array.
    state.songs.splice(0, state.songs.length);
  },
  clearUploadFiles(state) {
    state.uploadFiles.splice(0, state.uploadFiles.length);
  },
  updateSong(state, payload) {
    const { sid, data } = payload;
    const idx = state.songs.findIndex((song) => song.sid === sid);
    state.songs[idx] = { ...state.songs[idx], ...data };
  },
  deleteSong(state, payload) {
    const { index } = payload;
    state.songs.splice(index, 1);
  },
  addSong(state, payload) {
    const { doc } = payload;
    const song = {
      ...doc.data(),
      sid: doc.id,
    };
    state.songs.push(song);
  },
  addUploadFile(state, payload) {
    const { file } = payload;
    state.uploadFiles.push(file);
  },
  cancelUploadTasks(state) {
    state.uploadFiles.forEach((file) => {
      if (file.task) file.task.cancel();
    });
  },
};
