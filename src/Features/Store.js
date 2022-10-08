import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './productListSlice';
import basketSliceReducer from './basketSlice';
import userSliceReducer from './userSlice';

const store = configureStore({
  reducer: {
    products: productListReducer,
    basket: basketSliceReducer,
    user: userSliceReducer,
  },
});

export default store;
