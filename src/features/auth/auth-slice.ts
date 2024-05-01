import { User } from "@/constants/api-interface";
import { cookieManager } from "@/utilities/cookie-manager";
import { createSlice } from "@reduxjs/toolkit";

// default authentication state type
type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  isTeamLead: boolean;
};

// initial authentication state
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  isTeamLead: false,
  error: null,
};

// authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      // remove token from cookie
      cookieManager.removeCookie("tuso_accessToken");
      cookieManager.removeCookie("tuso_refreshToken");

      // clear the store
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },

    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setIsTeamLead: (state, action) => {
      state.isTeamLead = action.payload;
    },
  },
});

// export actions
export const { login, logout, setUser, setError, setTokens, setIsTeamLead } =
  authSlice.actions;

// export reducer
export default authSlice.reducer;
