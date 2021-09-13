import { createStore } from 'vuex';
import statesModule from './modules/states/index';
import authModule from './modules/auth/index';
import usersModule from './modules/users/index';
import songsModule from './modules/songs/index';
import settingModule from './modules/setting/index';
import commentsModule from './modules/comments/index';
import flwCommentsModule from './modules/followed-comments/index';
import audioModule from './modules/audio/index';
import melonModule from './modules/melon/index';
import spotifyModule from './modules/spotify/index';
import fandomModule from './modules/fandom/index';

const store = createStore({
  modules: {
    states: statesModule,
    auth: authModule,
    users: usersModule,
    songs: songsModule,
    setting: settingModule,
    comments: commentsModule,
    flwComments: flwCommentsModule,
    audio: audioModule,
    melon: melonModule,
    spotify: spotifyModule,
    fandom: fandomModule,
  },
});

export default store;
