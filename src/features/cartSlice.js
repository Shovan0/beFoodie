// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.findIndex(
        item => item._id === action.payload._id && item.size === action.payload.size
      );

      if (existingIndex >= 0) {
        // Item already exists in cart, update quantity and price
        state[existingIndex].qty += action.payload.qty;
        state[existingIndex].price += action.payload.price;
      } else {
        // New item, add to cart
        state.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
