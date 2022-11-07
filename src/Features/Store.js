import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import basketSliceReducer from './basketSlice';

import { firebaseApi } from './firebaseApi';
import filterSliceReducer from './filterSlice';

const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    filter: filterSliceReducer,
    basket: basketSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      firebaseApi.middleware
    ),
});

export default store;
