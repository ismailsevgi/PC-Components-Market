import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//firebase imports
import app from '../DataBASE/firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

//firebase vars
const dataBase = getFirestore(app);
const productsRef = collection(dataBase, 'products');

//update MockAPI
// import Data from '../DataBASE/jsondb.json';

//Grabs all the products and combines it

// const myData = JSON.parse(JSON.stringify(Data));
// const allEntries = Object.entries(myData);
// let AllProducts = [];
// allEntries.forEach((arr) => (AllProducts = AllProducts.concat(arr[1])));

// console.log(AllProducts);

const initialState = {
  filteredDatas: [],
  data: [],
  status: 'idle', //loading, "succeeded", "failed"
  error: null,
  label: 'allProducts',
};

//DataBase Update
// axios.post(
//   'https://63342f3090a73d0fede8ebdd.mockapi.io/computerProducts/products',
//   Data
// );

//  API VERSION
// export const fetchProducts = createAsyncThunk(
//   'productList/fetchProducts',
//   async () => {
//     try {
//       const response = await axios.get(
//         'https://63342f3090a73d0fede8ebdd.mockapi.io/computerProducts/products'
//       );
//       //Axios gives a response object with data property
//       //In order to not get non-serializable error, one should extract data here not inside reducer

//       return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

//Firebase version will be here
export const fetchProducts = createAsyncThunk(
  'productList/fetchProducts',
  async function (db) {
    const productsSnapshot = await getDocs(productsRef);
    const productList = productsSnapshot.docs.map((doc) => doc.data());
    console.log('productList:', productList);
    return productList;
  }
);

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    LIST_PRODUCTS: (state, { type, payload }) => {
      console.log('type, payload: ', type, payload);
      switch (payload) {
        case 'allProducts':
          state = {
            ...state,
            filteredDatas: state.data,
          };
          break;

        case 'GPUs':
          state = {
            ...state,
            label: 'GPUs',
            filteredDatas: state.data.filter((obj) => obj.tag === 'gpu'),
          };
          break;
        case 'CPUs':
          state = {
            ...state,
            label: 'CPUs',
            filteredDatas: state.data.filter((obj) => obj.tag === 'cpu'),
          };
          break;
      }
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
      state.data = action.payload;
      state.filteredDatas = action.payload;
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
