import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ArtistImageState {
    image: string;
}

const initialState: ArtistImageState = {
    image: "",
};

export const artistImageSlice = createSlice({
    name: "artistImage",
    initialState,
    reducers: {
        artistImageChange: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { artistImageChange } = artistImageSlice.actions;

export default artistImageSlice.reducer;
