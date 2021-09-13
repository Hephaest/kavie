import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Track from '@/views/Track.vue';
import Forum from '@/views/Forum.vue';
import Song from '@/views/Song.vue';
import store from '@/store';

const Manage = () => import('@/views/Manage.vue');
const Setting = () => import('@/views/Setting.vue');

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'about', path: '/about', component: About },
  { name: 'track', path: '/track/:id', component: Track },
  { name: 'forum', path: '/forum', component: Forum },
  { name: 'song', path: '/song/:id', component: Song },
  { name: 'manage', path: '/manage', meta: { authRequired: true }, component: Manage },
  { path: '/manage-music', redirect: { name: 'manage' } },
  { name: 'setting', path: '/setting', meta: { authRequired: true }, component: Setting },
  { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-green-400',
});

const needRedirect = (to) => {
  // Factor 1: Authentication guard
  const hasAuthRequired = to.matched.some((record) => record.meta.authRequired);
  const { hasUserLoggedIn } = store.state.auth;
  const authFailed = hasAuthRequired && !hasUserLoggedIn;
  return authFailed;
};

// Global guard
router.beforeEach((to, _from, next) => {
  if (needRedirect(to)) next({ name: 'home' });
  else next();
});

export default router;
