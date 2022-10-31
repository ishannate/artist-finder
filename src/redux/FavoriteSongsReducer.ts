import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteSong {
    name: string;
    artistName: string;
    mbid?: string;
}

export interface favoriteListState {
    favoriteList: FavoriteSong[];
}

const initialState: favoriteListState = {
    favoriteList: []
};

export const favoriteSongsSlice = createSlice({
    name: "favoriteSong",
    initialState,
    reducers: {
        updateFavList: (state, action: PayloadAction<FavoriteSong[]>) => {
            state.favoriteList = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateFavList } = favoriteSongsSlice.actions;

export default favoriteSongsSlice.reducer;
