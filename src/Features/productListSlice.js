import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//update MockAPI
// import Data from '../DataBASE/jsondb.json';

//Grabs all the products and combines it

// const myData = JSON.parse(JSON.stringify(Data));
// const allEntries = Object.entries(myData);
// let AllProducts = [];
// allEntries.forEach((arr) => (AllProducts = AllProducts.concat(arr[1])));

// console.log(AllProducts);

const initialState = {
  data: [],
  status: 'idle', //loading, "succeeded", "failed"
  error: null,
};

//DataBase Update
// axios.post(
//   'https://63342f3090a73d0fede8ebdd.mockapi.io/computerProducts/products',
//   Data
// );

export const fetchProducts = createAsyncThunk(
  'productList/fetchProducts',
  async () => {
    try {
      const response = await axios.get(
        'https://63342f3090a73d0fede8ebdd.mockapi.io/computerProducts/products'
      );
      //Axios gives a response object with data property
      //In order to not get non-serializable error, one should extract data here not inside reducer

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    LIST_PRODUCTS: (state, payload) => {
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
      state.data = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = [...action.payload];
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.data = [];
      state.error = action.error.message;
    });
  },
});

console.log('productList...');

export default productSlice.reducer;
export const { LIST_PRODUCTS } = productSlice.actions;
