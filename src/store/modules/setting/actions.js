import { storage } from '@/includes/firebase';
import { getStorageErrorMessage } from '@/utils/errors';

const acceptFileTypes = ['image/jpeg', 'image/png'];

const onChangedHandler = (file, snapshot) => {
  file.state = 'active';
  const { bytesTransferred, totalBytes } = snapshot;
  file.progress = (bytesTransferred / totalBytes) * 100;
};

const onErrorHandler = (file, error) => {
  file.state = 'aborted';
  file.errorCode = getStorageErrorMessage(error);
};

// arrow function cannot bind this
async function onCompletedHandler(file, snapshot) {
  file.url = await snapshot.ref.getDownloadURL();
  file.state = 'completed';
}

export default {
  async uploadAvatar({ state, commit }, payload) {
    const { file } = payload;

    commit('clearUploadFile');

    if (!acceptFileTypes.includes(file.type)) {
      commit('setUploadTask', { file: {
        name: file.name,
        progress: 0,
        state: 'aborted',
        errorCode: 'storage.fileFormatNotSupported',
      } });
      return;
    }

    if (!navigator.onLine) {
      commit('setUploadTask', { file: {
        name: file.name,
        progress: 0,
        state: 'aborted',
        errorCode: 'network.offline',
      } });
      return;
    }

    const storageRef = storage.ref();
    const avatarRef = storageRef.child(`avatars/${file.name}`);
    const task = avatarRef.put(file);

    const uploadFile = {
      task,
      name: file.name,
      url: '',
      progress: 0,
      state: 'idle',
      errorCode: null,
    };

    commit('setUploadTask', { file: uploadFile });

    const trackFile = state.uploadFile;

    task.on(
      'state_changed',
      onChangedHandler.bind(null, trackFile),
      onErrorHandler.bind(null, trackFile),
      onCompletedHandler.bind(null, trackFile, task.snapshot),
    );
  },
  cancelUploadTask({ commit }) {
    commit('cancelUploadTask');
  },
  clearUploadFile({ commit }) {
    commit('clearUploadFile');
  },
  updateLocale({ commit }, payload) {
    commit('updateLocale', payload);
  },
  resetLocale({ commit }) {
    commit('resetLocale');
  },
};
