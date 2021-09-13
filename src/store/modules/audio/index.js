import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state: {
    song: {},
    sound: null,
    seek: 0,
    duration: 0,
  },
  getters,
  mutations,
  actions,
};
