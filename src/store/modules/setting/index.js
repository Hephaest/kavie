import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state: {
    uploadFile: null,
    locale: 'zh',
  },
  getters,
  mutations,
  actions,
};
