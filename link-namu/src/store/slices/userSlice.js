import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const initialState = {
  accessToken: cookies.load("accessToken"),
  refreshToken: cookies.load("refreshToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      cookies.save("accessToken", state.accessToken, {
        path: "/",
      });
      cookies.save("refreshToken", state.refreshToken, {
        path: "/",
      });
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
