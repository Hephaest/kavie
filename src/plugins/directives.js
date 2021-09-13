import Icon from '@/directives/icon';
import Observer from '@/directives/observer';

export default {
  install(app) {
    app.directive('icon', Icon);
    app.directive('observer', Observer);
  },
};
