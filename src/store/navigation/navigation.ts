import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  activeRoute: string;
}

const initialState: State = {
  activeRoute: "#home",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActiveRoute(state, action: PayloadAction<string>) {
      state.activeRoute = action.payload;
    },
  },
});

export const { setActiveRoute } = navigationSlice.actions;
