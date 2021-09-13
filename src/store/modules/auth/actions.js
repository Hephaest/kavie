import { auth, usersCollection } from '@/includes/firebase';

let timer;

const avatarURL = 'https://cdn.iconscout.com/icon/free/png-256/cat-3060330-2560054.png';

export default {
  async signUp({ commit, dispatch }, payload) {
    const { email, password } = payload.data;
    const { user } = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    const { uid } = user;
    const { name, age, locale } = payload.data;
    const data = { name, email, age, locale, avatarURL, likes: [], loves: [] };

    await usersCollection.doc(uid).set(data);

    // Clear user first
    commit('resetUser');
    commit('setUser', user);
    commit('toggleAuthState');

    // Set locale
    commit('setting/updateLocale', { locale }, { root: true });

    // Auto Logout
    dispatch('autoSignOut', { user });
  },
  async signIn({ commit, dispatch }, payload) {
    const { email, password } = payload.data;
    const { user } = await auth.signInWithEmailAndPassword(email, password);

    // Clear user first
    commit('resetUser');
    commit('setUser', user);
    commit('toggleAuthState');

    // Auto Logout
    dispatch('autoSignOut', { user });

    // Set locale & update users vuex state
    const { locale } = await dispatch('users/getUserData', { uid: user.uid }, { root: true });
    commit('setting/updateLocale', { locale }, { root: true });
  },
  async signOut({ commit }) {
    await auth.signOut();

    commit('resetUser');
    commit('toggleAuthState');

    // Clear All Vuex bundles
    commit('setting/clearUploadFile', null, { root: true });
    commit('setting/resetLocale', null, { root: true });
    commit('songs/clearSongs', null, { root: true });
    commit('songs/clearUploadFiles', null, { root: true });
    commit('states/resetEditState', null, { root: true });

    // Stop the execution of timer
    clearTimeout(timer);
  },
  async autoLogin({ commit, dispatch }) {
    const user = auth.currentUser;
    if (!user) return;

    // Clear user first
    commit('resetUser');
    commit('setUser', user);
    commit('toggleAuthState');

    // Set locale & update users vuex state
    const { locale } = await dispatch('users/getUserData', { uid: user.uid }, { root: true });
    commit('setting/updateLocale', { locale }, { root: true });

    // Auto Logout
    dispatch('autoSignOut', { user });
  },
  async autoSignOut({ dispatch }, payload) {
    const { user } = payload;
    const { expirationTime } = await user.getIdTokenResult();
    const tokenExpiration = Date.parse(expirationTime);
    const leftTime = tokenExpiration - new Date().getTime();
    timer = setTimeout(() => {
      dispatch('signOut');
    }, leftTime);
  },
};
