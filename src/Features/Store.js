import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './productListSlice';
import basketSliceReducer from './basketSlice';

const store = configureStore({
  reducer: {
    products: productListReducer,
    basket: basketSliceReducer,
  },
});

export default store;
