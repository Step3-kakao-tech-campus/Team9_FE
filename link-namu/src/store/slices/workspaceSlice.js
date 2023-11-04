import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceList: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceList: (state, action) => {
      state.workspaceList = action.payload.workspaceList;
    },
  },
});

export const { setWorkspaceList } = workspaceSlice.actions;
export const selectWorkspaceList = (state) => state.workspace;

export default workspaceSlice.reducer;
