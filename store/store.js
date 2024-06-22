import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import userSlice from './userSlice';
import bookmarkSlice from './bookmarkSlice';
import cartSlice from './cartSlice';
import loaderReducer from './loaderSlice';

export const store = configureStore({
  reducer: {
    bookmark: bookmarkSlice,
    cart: cartSlice,
    app: appSlice,
    loader: loaderReducer,
    user: userSlice,
  },
})