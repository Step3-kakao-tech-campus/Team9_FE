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
export const getWorkspaceList = (state) => state.workspace.workspaceList;

export default workspaceSlice.reducer;
