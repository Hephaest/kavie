import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import states from '@/utils/states';

export default {
  namespaced: true,
  state: {
    edit: states.unchanged,
  },
  getters,
  mutations,
  actions,
};
