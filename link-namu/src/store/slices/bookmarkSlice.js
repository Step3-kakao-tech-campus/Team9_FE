import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currCategoryId: null,
  currCategoryName: "",
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setCurrCategory: (state, action) => {
      state.currCategoryId = action.payload.categoryId;
      state.currCategoryName = action.payload.categoryName;
    },
  },
});

export const { setCurrCategory } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
