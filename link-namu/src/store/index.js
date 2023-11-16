import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookmarkReducer from "./slices/bookmarkSlice";
import workspaceSlice from "./slices/workspaceSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    bookmark: bookmarkReducer,
    workspace: workspaceSlice,
    modal: modalReducer,
  },
});

const getAccessToken = () => {
  return store.getState().user.accessToken;
};

export default store;
export { getAccessToken };
