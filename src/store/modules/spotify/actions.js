import qs from 'qs';
import { spotifyAuthAxios as AuthAxios, spotifyApiAxios as ApiAxios } from '@/includes/customAxios';
import { formatDuration, formatFullDate } from '@/utils/formats';

export default {
  async getAccessToken({ commit }) {
    try {
      const data = { grant_type: 'client_credentials' };
      const response = await AuthAxios.post('token', qs.stringify(data));
      const { access_token: accessToken, expires_in: expiresIn } = response.data;
      const expireTime = +expiresIn * 1000;

      setTimeout(() => {
        commit('setAccessToken', { accessToken: null });
      }, expireTime);

      commit('setAccessToken', { accessToken });
      return accessToken;
    } catch (error) {
      throw new Error('Access token retrieve error.');
    }
  },
  async getSongDetailsByQuery({ state, getters, dispatch }, payload) {
    const accessToken = getters.hasAccessToken
      ? state.accessToken
      : await dispatch('getAccessToken');

    const { name, artists } = payload;

    try {
      let response = await ApiAxios.get('search', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: `${name} ${artists}` },
      });
      let { tracks: { items } } = response.data;

      if (items.length === 0) {
        // Try to search again with the track name
        response = await ApiAxios.get('search', {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { q: name },
        });
        items = response.data.tracks.items;
        if (items.length === 0) throw new Error('No results found');
      }

      const {
        album: {
          album_type: albumType,
          id: albumId,
          name: albumName,
          images: albumImages,
          release_date: releaseDate,
          total_tracks: totalTracks,
        },
        artists: trackArtists,
        duration_ms: trackDuration,
        id: trackId,
        name: trackName,
      } = items[0];

      // Album
      const albumInfo = {
        id: albumId,
        name: albumName,
        type: albumType,
        imageUrl: albumImages.length > 0 ? albumImages[0].url : '',
        releaseDate: formatFullDate(releaseDate),
        totalTracks,
      };

      // Artists
      const artistInfoPromises = trackArtists.map(async (trackArtist) => {
        const info = await dispatch('getArtistInfoById', { id: trackArtist.id });
        return {
          id: trackArtist.id,
          name: trackArtist.name,
          ...info,
        };
      });

      // Now that all the asynchronous operations are running, here we wait until they all complete.
      const artistsInfo = await Promise.all(artistInfoPromises);

      // Track
      const trackInfo = {
        id: trackId,
        name: trackName,
        duration: formatDuration(trackDuration),
      };

      // Bundle
      return {
        album: { ...albumInfo },
        artists: artistsInfo,
        track: { ...trackInfo },

      };
    } catch (error) {
      return null;
    }
  },
  async getArtistInfoById({ state, getters, dispatch }, payload) {
    const accessToken = getters.hasAccessToken
      ? state.accessToken
      : await dispatch('getAccessToken');

    const { id } = payload;

    try {
      const response = await ApiAxios.get(`artists/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { followers: { total }, genres, images } = response.data;
      const imageUrl = images.length > 0 ? images[0].url : '';
      return {
        followers: total,
        genres: genres.join(','),
        imageUrl,
      };
    } catch (error) {
      return {};
    }
  },
  async getArtistTopTracksById({ state, getters, dispatch }, payload) {
    const accessToken = getters.hasAccessToken
      ? state.accessToken
      : await dispatch('getAccessToken');

    const { id } = payload;

    try {
      const response = await ApiAxios.get(`artists/${id}/top-tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { country: 'KR' },
      });

      const tracks = response.data.tracks.map((track) => ({
        id: track.id,
        link: track.external_urls.spotify,
        name: track.name,
        imageUrl: track.album.images.length > 0 ? track.album.images[0].url : '',
        release_date: track.album.release_date,
        artists: track.artists.map((artist) => artist.name).join(', '),
      }));

      return tracks;
    } catch (error) {
      return [];
    }
  },
};
