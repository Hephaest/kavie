import { storage, songsCollection } from '@/includes/firebase';
import { getStorageErrorMessage } from '@/utils/errors';

const onChangedHandler = (file, snapshot) => {
  file.state = 'active';
  const { bytesTransferred, totalBytes } = snapshot;
  const progress = (bytesTransferred / totalBytes) * 100;
  file.progress = progress;
};

const onErrorHandler = (file, error) => {
  file.state = 'aborted';
  file.errorCode = getStorageErrorMessage(error);
};

// arrow function cannot bind this
async function onCompletedHandler(data, action, snapshot) {
  const { file, uid } = data;
  const song = {
    uid,
    originalName: snapshot.ref.name,
    modifiedName: snapshot.ref.name,
    genre: 'K-pop',
    commentCount: 0,
    loveCount: 0,
  };

  song.url = await snapshot.ref.getDownloadURL();

  await action(song);

  file.state = 'completed';
}

export default {
  async getSongs({ commit }, payload) {
    const { uid } = payload;
    // Clear first!
    commit('clearSongs');

    let docs = [];

    if (uid) docs = await songsCollection.where('uid', '==', uid).get();
    else docs = await songsCollection.get();

    docs.forEach((doc) => commit('addSong', { doc }));
  },
  async getSong({ commit, getters }, payload) {
    const { sid } = payload;
    const song = getters.getSong(sid);
    if (song) return song;
    const doc = await songsCollection.doc(sid).get();
    if (!doc.exists) return null;
    commit('addSong', { doc });
    return { sid: doc.id, ...doc.data() };
  },
  async addSong({ commit }, payload) {
    const { song } = payload;

    const songRef = await songsCollection.add(song);
    const doc = await songRef.get();

    commit('addSong', { doc });
  },
  async uploadSong({ getters, commit, dispatch, rootState }, payload) {
    const { files } = payload;

    commit('clearUploadFiles');

    files.forEach((file, index) => {
      if (file.type !== 'audio/mpeg') {
        commit('addUploadFile', { file: {
          name: file.name,
          progress: 0,
          state: 'aborted',
          errorCode: 'storage.fileFormatNotSupported',
        } });
        return;
      }

      if (!navigator.onLine) {
        commit('addUploadFile', { file: {
          name: file.name,
          progress: 0,
          state: 'aborted',
          errorCode: 'network.offline',
        } });
        return;
      }

      const storageRef = storage.ref();
      const songsRef = storageRef.child(`songs/${file.name}`);
      const task = songsRef.put(file);

      const uploadFile = {
        task,
        name: file.name,
        progress: 0,
        state: 'idle',
        errorCode: null,
      };

      commit('addUploadFile', { file: uploadFile });

      const trackFile = getters.getUploadFile(index);

      const addSongAction = (song) => dispatch('addSong', { song });

      task.on(
        'state_changed',
        onChangedHandler.bind(null, trackFile),
        onErrorHandler.bind(null, trackFile),
        onCompletedHandler.bind(this, { file: trackFile, uid: rootState.auth.user.uid }, addSongAction, task.snapshot),
      );
    });
  },
  async updateSong({ commit }, payload) {
    const { sid, data } = payload;

    await songsCollection.doc(sid).update(data);

    commit('updateSong', { sid, data });
  },
  async deleteSong({ commit }, payload) {
    const { index, song } = payload;
    const { originalName, sid } = song;

    const storageRef = storage.ref();
    const songRef = storageRef.child(`songs/${originalName}`);

    await songRef.delete();
    await songsCollection.doc(sid).delete();

    commit('deleteSong', { index });
  },
  cancelUploadTasks({ commit }) {
    commit('cancelUploadTasks');
  },
};
