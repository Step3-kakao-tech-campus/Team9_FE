import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const initialState = {
  accessToken: null,
  refreshToken: cookies.load("refreshToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      if (state.refreshToken) {
        cookies.save("refreshToken", state.refreshToken, {
          path: "/",
          // httpOnly: true,
        });
        cookies.save("accessToken", state.accessToken, {
          path: "/",
        });
      }
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
