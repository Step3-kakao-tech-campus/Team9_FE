import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const initialState = {
  token: cookies.load("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      cookies.save("token", state.token, {
        path: "/",
      });
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
