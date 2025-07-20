import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    clearUserEmail: (state) => {
      state.email = null;
    },
  },
});

export const { setUserEmail, clearUserEmail } = userSlice.actions;
export default userSlice.reducer;
