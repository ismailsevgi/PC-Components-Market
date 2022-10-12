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
const dataBase = getFirestore(app);

const userCollection = collection(dataBase, 'users');

//yaratılan product'a userId verilebiliyormu bak!

let initialState = {
  userName: '',
  userId: 'default',
  firstName: '',

  birthDate: '',
  userId: '',
  userStatus: false,
  profileImageURL: '',
  email: '',

  userProducts: [],
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
    REGIST_USER: (state, { type, payload }) => {
      const { email, password, firstName, lastName } = payload;
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          // console.log('Registered: ', cred.user);

          updateProfile(cred.user, {
            displayName: `${firstName} ${lastName}`,
          });

          try {
            const docRef = addDoc(collectionRef, {
              id: cred.user.uid,
              birth: '',
              gender: '',
              createdAt: serverTimestamp(),
            }).then(() => {
              // console.log('User Dosyasına kullanıcı eklendi');
            });
          } catch (e) {
            // console.error('Error adding document: ', e);
          }
        })
        .catch((err) => alert('Kayıt sırasında bir hata oldu: ', err.message));
    },
    LOGIN_USER: (state, { type, payload }) => {
      const { email, password } = payload;

      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('Cred: ', cred.user);
          return {
            userId: cred.user.uid,
            firstName: cred.user.displayName,
          };
        })
        .catch((err) =>
          console.log('Giriş sırasında bir hata oldu: ', err.message)
        );
    },
    SET_USER_PRODUCTS: (state, { type, payload }) => {
      console.log('Gelen Payload: ', payload);
      return {
        ...state,
        userProducts: payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveUser.fulfilled, (state, { type, payload }) => {
      state.userStatus = true;
      state.userName = auth.currentUser.displayName;
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
export const { REGIST_USER, LOGIN_USER, SET_USER_PRODUCTS } = userSlice.actions;
