import { configureStore } from "@reduxjs/toolkit";
import ArtistImageReducer from "./ArtistImageReducer";
import artistNameReducter from "./ArtistReducer";
import FavoriteSongsReducer from "./FavoriteSongsReducer";

export default configureStore({
  reducer: {
    artist: artistNameReducter,
    favouriteSongs: FavoriteSongsReducer,
    artistImage: ArtistImageReducer
  },
});
