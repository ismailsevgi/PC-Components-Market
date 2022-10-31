import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import app from '../DataBASE/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

const auth = getAuth(app);

//yaratılan product'a userId verilebiliyormu bak!

let initialState = {
  userId: 'default',
  displayName: '',

  birthDate: '',
  userId: '',
  userStatus: false,
  profileImageURL: '',
  email: '',
  userProducts: [],
  userBasket: [],
  userFavorites: [],
};

export const saveUser = createAsyncThunk(
  'user/saveUser',

  async () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          //User Exists

          resolve({
            displayName: user.displayName,
            email: user.email,
            userId: user.uid,
          });
        } else {
          //User not found

          reject(false);
        }
      });
    });
  }
);

//Loginden sonra regist çalışıyor?
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, { type, payload }) => {
      // console.log('Set User payload', payload);
      state.userFavorites = payload.userFavorites;
      if (type == 'remove') {
        console.log('remove calisti', payload);
        return {
          ...state,
          userFavorites: state.userFavorites.filter((str) => payload != str),
        };
      }
      if (type == 'add') {
        console.log('Add calisti', payload);
        return {
          ...state,
          userFavorites: state.userFavorites.push(payload),
        };
      }
    },
    LOGIN_USER: (state, { type, payload }) => {
      const { email } = payload;

      //login işlemi registe yapılacak buraya bilgiler dispatch edilecek.
    },
    SET_USER_PRODUCTS: (state, { type, payload }) => {
      console.log('Gelen Payload: ', payload);
      return {
        ...state,
        userProducts: payload,
      };
    },
    HANDLE_USER_FAVORITES: (state, { type, payload }) => {
      //type add ise gelen payload'ı listeye ekle,
      //type remove ise gelen payload'ı sil
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUser.fulfilled, (state, { type, payload }) => {
      state.userStatus = true;
      state.displayName = auth.currentUser.displayName;
      state.email = auth.currentUser.email;
      state.userId = payload.userId;
    });
    builder.addCase(saveUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.userStatus = false;
    });
  },
});

export default userSlice.reducer;
export const {
  SET_USER,
  LOGIN_USER,
  SET_USER_PRODUCTS,
  HANDLE_USER_FAVORITES,
} = userSlice.actions;
