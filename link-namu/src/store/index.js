import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookmarkReducer from "./slices/bookmarkSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookmark: bookmarkReducer,
  },
});

export default store;
