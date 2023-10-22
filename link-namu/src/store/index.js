import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookmark: bookmarkReducer,
    modal: modalReducer,
  },
});

const getToken = () => {
  return store.getState().user.accessToken;
};

export default store;
export { getToken };
