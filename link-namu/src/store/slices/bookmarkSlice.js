import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currWorkspaceId: null,
  currWorkspaceName: "",
  currCategoryId: null,
  currCategoryName: "",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setCurrCategory: (state, action) => {
      state.currWorkspaceId = action.payload.workspaceId;
      state.currWorkspaceName = action.payload.workspaceName;
      state.currCategoryId = action.payload.categoryId;
      state.currCategoryName = action.payload.categoryName;
    },
  },
});

export const { setCurrCategory } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
