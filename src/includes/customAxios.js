import axios from 'axios';

const {
  VUE_APP_CORS_PROXY_URL: CORS_URL,
  VUE_APP_SPOTIFY_CLIENT_ID: SPOTIFY_USERNAME,
  VUE_APP_SPOTIFY_CLIENT_SECRET: SPOTIFY_PASSWORD,
  NODE_ENV,
} = process.env;

// For common config
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const melonBaseURL = NODE_ENV === 'production' ? `${CORS_URL}https://melon.danielko.me/api/v1/chart/` : '/melon-api/';
// For Melon config
const melonAxios = axios.create({
  baseURL: melonBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const spotifyAuthBaseURL = NODE_ENV === 'production' ? `${CORS_URL}https://accounts.spotify.com/api/` : '/spotify-auth/';
const spotifyAuthAxios = axios.create({
  baseURL: spotifyAuthBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: SPOTIFY_USERNAME,
    password: SPOTIFY_PASSWORD,
  },
});

const spotifyApiBaseURL = NODE_ENV === 'production' ? `${CORS_URL}https://api.spotify.com/v1/` : '/spotify-api/';
const spotifyApiAxios = axios.create({
  baseURL: spotifyApiBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    type: 'track',
    limit: '1',
  },
});

export {
  melonAxios,
  spotifyAuthAxios,
  spotifyApiAxios,
};
