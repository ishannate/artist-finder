import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavouriteSong {
    name: string;
    artistName: string;
    mbid?: string;
}

export interface favouriteListState {
    favouriteList: FavouriteSong[];
}

const initialState: favouriteListState = {
    favouriteList: []
};

export const favouriteSongsSlice = createSlice({
    name: "favouriteSong",
    initialState,
    reducers: {
        updateFavList: (state, action: PayloadAction<FavouriteSong[]>) => {
            state.favouriteList = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateFavList } = favouriteSongsSlice.actions;

export default favouriteSongsSlice.reducer;
