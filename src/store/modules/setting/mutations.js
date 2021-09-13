export default {
  setUploadTask: (state, payload) => {
    const { file } = payload;
    state.uploadFile = file;
  },
  clearUploadFile: (state) => {
    state.uploadFile = null;
  },
  cancelUploadTask: (state) => {
    if (state.uploadFile && state.uploadFile.task) state.uploadFile.task.cancel();
  },
  updateLocale: (state, payload) => {
    const { locale } = payload;
    state.locale = locale;
  },
  resetLocale: (state) => {
    state.locale = 'en';
  },
};
