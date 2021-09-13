import states from '@/utils/states';

export default {
  needConfirmUnsavedChange: (state) => state.edit === states.editing,
};
