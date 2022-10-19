import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productListReducer from './productListSlice';
import basketSliceReducer from './basketSlice';
import userSliceReducer from './userSlice';
import { firebaseApi } from './firebaseApi';

const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    products: productListReducer,
    basket: basketSliceReducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      firebaseApi.middleware
    ),
});

export default store;
