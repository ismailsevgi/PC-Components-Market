import { createSlice } from '@reduxjs/toolkit';
import Data from '../DataBASE/jsondb.json';

const myData = JSON.parse(JSON.stringify(Data));

const initialState = {
  productsArray: myData,
};

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    LIST_PRODUCTS: (state, payload) => {
      return state;
    },
  },
});

export default productSlice.reducer;
export const { LIST_PRODUCTS } = productSlice.actions;
