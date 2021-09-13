import { Howl } from 'howler';

export default {
  playSong({ commit, state, dispatch }, payload) {
    if (state.sound instanceof Howl) {
      // Pause current audio & remove instance from memory
      state.sound.unload();
    }

    commit('setSound', payload);
    state.sound.play();
    state.sound.on('play', () => {
      requestAnimationFrame(() => {
        dispatch('updateProgress');
      });
    });
  },
  updateProgress({ commit, dispatch, getters }) {
    commit('updateProgress');
    if (getters.isPlaying) {
      requestAnimationFrame(() => {
        dispatch('updateProgress');
      });
    }
  },
  updateSeek({ state, getters, dispatch }, payload) {
    if (!getters.hasSound) return;
    const { x, width } = payload.currentTarget.getBoundingClientRect();
    const clickX = payload.clientX - x;
    const percentage = clickX / width;
    const seconds = state.sound.duration() * percentage;
    state.sound.seek(seconds);
    state.sound.once('seek', () => {
      dispatch('updateProgress');
    });
  },
  toggleAudio({ state, getters }) {
    if (!getters.hasSound) return;

    if (state.sound.playing()) {
      state.sound.pause();
    } else {
      state.sound.play();
    }
  },
};
