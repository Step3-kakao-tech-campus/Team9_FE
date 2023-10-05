import { createSlice } from "@reduxjs/toolkit";
import cookies from "react-cookies";

const initialState = {
  googleToken: cookies.load("token"),
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.googleToken = action.payload.googleToken;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
