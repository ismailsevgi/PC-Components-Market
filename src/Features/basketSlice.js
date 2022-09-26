import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketItems: [],
};

const basketSlice = createSlice({
  name: 'BASKET',
  initialState,
  reducers: {
    ADD_TO_BASKET: (state, action) => {
      //checks if there is an obj has the same id.
      const findObj = state.basketItems.find(
        (obj) => obj.id === action.payload.id
      );

      if (findObj) {
        return {
          basketItems: [
            ...state.basketItems.filter((obj) => obj.id !== findObj.id), //deletes the og obj.
            { ...findObj, quantity: findObj.quantity + 1 }, //puts a new obj with new quantity
          ],
        };
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, action.payload],
        };
      }
    },
    REMOVE_FROM_BASKET: (state, action) => {
      return {
        basketItems: state.basketItems.filter(
          (product) => product.id !== action.payload
        ),
      };
    },
    INCREASE_AMOUNT: (state, action) => {
      return {
        basketItems: state.basketItems.map((product) => {
          if (product.id === action.payload) {
            if (product.quantity === product.stock) {
              throw alert('You can not buy more than stock');
            } else {
              return { ...product, quantity: product.quantity + 1 };
            }
          }
          return product;
        }),
      };
    },
    DECREASE_AMOUNT: (state, action) => {
      return {
        basketItems: state.basketItems.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        }),
      };
    },
    CHANGE_CHECK: (state, action) => {
      return {
        basketItems: state.basketItems.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, check: !product.check };
          } else {
            return product;
          }
        }),
      };
    },
  },
});

export default basketSlice.reducer;
export const {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  CHANGE_CHECK,
} = basketSlice.actions;
