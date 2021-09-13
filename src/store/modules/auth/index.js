import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state: {
    hasUserLoggedIn: false,
    user: null,
  },
  getters,
  mutations,
  actions,
};
