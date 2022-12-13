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
        let newBasket = {
          basketItems: [
            ...state.basketItems.filter((obj) => obj.id !== findObj.id), //deletes the og obj.
            { ...findObj, quantity: findObj.quantity + 1 }, //puts a new obj with new quantity
          ],
        };
        localStorage.setItem('userBasket', newBasket);
        return newBasket;
      } else {
        let newBasket = {
          ...state,
          basketItems: [...state.basketItems, action.payload],
        };
        localStorage.setItem('userBasket', JSON.stringify(newBasket));
        return newBasket;
      }
    },
    REMOVE_FROM_BASKET: (state, action) => {
      let newBasket = {
        basketItems: state.basketItems.filter(
          (product) => product.id !== action.payload
        ),
      };
      localStorage.setItem('userBasket', JSON.stringify(newBasket));
      return newBasket;
    },
    INCREASE_AMOUNT: (state, action) => {
      let newBasket = {
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
      localStorage.setItem('userBasket', JSON.stringify(newBasket));
      return newBasket;
    },
    DECREASE_AMOUNT: (state, action) => {
      let newBasket = {
        basketItems: state.basketItems.map((product) => {
          if (product.id === action.payload) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        }),
      };
      localStorage.setItem('userBasket', JSON.stringify(newBasket));
      return newBasket;
    },
    CHANGE_CHECK: (state, action) => {
      let changedBasket = {
        basketItems: state.basketItems.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, check: !product.check };
          } else {
            return product;
          }
        }),
      };
      localStorage.setItem('userBasket', JSON.stringify(changedBasket));
      return changedBasket;
    },
    SET_OFFLINE_BASKET: (state, { type, payload }) => {
      return JSON.parse(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('BASKET/ADD_TO_BASKET', (state) => {
      state.error = action.error.message;
      state.userStatus = false;
    });
  },
});

export default basketSlice.reducer;
export const {
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  CHANGE_CHECK,
  SET_OFFLINE_BASKET,
} = basketSlice.actions;
