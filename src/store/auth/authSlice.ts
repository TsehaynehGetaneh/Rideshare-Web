import { Token } from "@/types/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean | null;
}

const initialState: State = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<Token>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAccessToken, logout } = authSlice.actions;
