import states from '@/utils/states';

export default {
  updateEditState: (state, payload) => {
    const { state: newState } = payload;
    state.edit = newState;
  },
  resetEditState: (state) => {
    state.edit = states.unchanged;
  },
};
