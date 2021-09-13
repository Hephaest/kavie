import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    songs: [],
    choice: 'live',
  },
  mutations,
  actions,
};
