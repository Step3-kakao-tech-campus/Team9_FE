import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: "",
  isOpen: false,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.modalType;
      state.data = action.payload.data;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.data = null;
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state) => state.modal;
export const isModalOpen = (state) => state.modal.isOpen;

export default modalSlice.reducer;
