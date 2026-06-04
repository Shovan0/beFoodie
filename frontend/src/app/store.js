import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import modalReducer from '../features/modalSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    user: userReducer,
    
  },
});
