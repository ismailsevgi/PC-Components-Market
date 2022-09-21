import { configureStore } from '@reduxjs/toolkit';
import productListReducer from '../Features/productListSlice';
import basketSliceReducer from '../Features/basketSlice';

const store = configureStore({
  reducer: {
    products: productListReducer,
    basket: basketSliceReducer,
  },
});

export default store;
