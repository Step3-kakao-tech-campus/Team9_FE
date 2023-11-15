import { createSlice } from "@reduxjs/toolkit";
import { getRefreshToken, getAccessToken } from "../../utils/auth";

const initialState = {
  refreshToken: getRefreshToken(),
  accessToken: getAccessToken(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refresh: (state) => {
      state.refreshToken = getRefreshToken();
      state.accessToken = getAccessToken();
    },
  },
});

export const { refresh } = userSlice.actions;

export default userSlice.reducer;
