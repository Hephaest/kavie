import { formatTime } from '@/utils/formats';

export default {
  progress: (state) => (state.seek / state.duration) * 100 || 0,
  isPlaying: (state) => (state.sound && state.sound.playing()) || false,
  hasSound: (state) => !!state.sound,
  seek: (state) => formatTime(state.seek) || '00:00',
  duration: (state) => formatTime(state.duration) || '00:00',
};
