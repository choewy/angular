import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  auth: {
    user: null | any;
    token: null | string;
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: AuthState) => state.auth.user;
export const selectCurrentToken = (state: AuthState) => state.auth.token;

export default authSlice.reducer;
