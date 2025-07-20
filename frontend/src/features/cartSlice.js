import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    incrementCart: (state) => {
      state.count += 1;
    },
    decrementCart: (state) => {
      if (state.count > 0) state.count -= 1;
    },
    clearCart: (state) => {
      state.count = 0;
    },
  },
});

export const { setCartCount, incrementCart, decrementCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
