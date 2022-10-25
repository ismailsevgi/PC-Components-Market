import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import basketSliceReducer from './basketSlice';
import userSliceReducer from './userSlice';
import { firebaseApi } from './firebaseApi';
import filterSliceReducer from './filterSlice';

const store = configureStore({
  reducer: {
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    filter: filterSliceReducer,
    basket: basketSliceReducer,
    user: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      firebaseApi.middleware
    ),
});

export default store;
