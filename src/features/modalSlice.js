// src/features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogin: false,
  showSignup: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLogin: (state) => {
      state.showLogin = true;
      state.showSignup = false;
    },
    openSignup: (state) => {
      state.showSignup = true;
      state.showLogin = false;
    },
    closeModals: (state) => {
      state.showLogin = false;
      state.showSignup = false;
    },
  },
});

export const { openLogin, openSignup, closeModals } = modalSlice.actions;

export default modalSlice.reducer;
