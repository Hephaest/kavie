import { Howl } from 'howler';

export default {
  setSound: (state, payload) => {
    const { song } = payload;
    state.song = song;
    state.sound = new Howl({
      src: [song.url],
      html5: true,
    });
  },
  updateProgress: (state) => {
    state.seek = state.sound.seek();
    state.duration = state.sound.duration();
  },
};
