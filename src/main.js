import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import VeeValidatePlugin from './plugins/validation';
import GlobalComponents from './plugins/components';
import GlobalDirectives from './plugins/directives';
import NProgress from './plugins/nprogress';
import { auth as firebaseAuth } from './includes/firebase';
import './registerServiceWorker';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/tailwind.css';
import './assets/main.css';
import 'nprogress/nprogress.css';

NProgress(router);

let app = null;
firebaseAuth.onAuthStateChanged(() => {
  if (app) return;
  app = createApp(App);

  app.use(store);
  app.use(router);

  app.use(i18n);
  app.use(VeeValidatePlugin);
  app.use(GlobalComponents);
  app.use(GlobalDirectives);

  app.mount('#app');
});
