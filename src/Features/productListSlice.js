import { createSlice } from '@reduxjs/toolkit';
import Data from '../DataBASE/jsondb.json';

//Grabs all the products and combines it
const myData = JSON.parse(JSON.stringify(Data));
const allEntries = Object.entries(myData);
let AllProducts = [];
allEntries.forEach((arr) => (AllProducts = AllProducts.concat(arr[1])));

const initialState = {
  productsArray: AllProducts,
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
