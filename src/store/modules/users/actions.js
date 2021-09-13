import { usersCollection } from '@/includes/firebase';

export default {
  async getUserData({ getters, commit }, payload) {
    const { uid } = payload;
    if (!uid) return null;
    const user = getters.getUser(uid);
    if (user) return user;
    const userDoc = await usersCollection.doc(uid).get();
    const data = userDoc.data();
    commit('setUser', { uid, data });
    return data;
  },
  async updateUserData({ commit }, payload) {
    const { uid, data } = payload;
    await usersCollection.doc(uid).update(data);
    commit('updateUser', { uid, data });
  },
};
