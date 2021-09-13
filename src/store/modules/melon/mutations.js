export default {
  setChoice: (state, payload) => {
    const { choice } = payload;
    state.choice = choice;
  },
  setSongs: (state, payload) => {
    const { songs } = payload;
    // Remove all elements from the array and will actually clean the original array.
    state.songs.splice(0, state.songs.length);
    songs.forEach((song) => state.songs.push(song));
  },
};
