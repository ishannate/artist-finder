import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ArtistNameState {
  name: string;
}

const initialState: ArtistNameState = {
  name: "",
};

export const artistnameSlice = createSlice({
  name: "artistName",
  initialState,
  reducers: {
    artistNameChange: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { artistNameChange } = artistnameSlice.actions;

export default artistnameSlice.reducer;
