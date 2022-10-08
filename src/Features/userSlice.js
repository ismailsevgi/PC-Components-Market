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

const auth = getAuth(app);

//yaratılan product'a userId verilebiliyormu bak!

let initialState = {
  userName: '',
  userId: '',
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
          console.log('user: ', user);
          resolve({
            displayName: user.displayName,
            email: user.email,
            userId: user.uid,
          });
        } else {
          //User not found

          resolve(false);
        }
      });
    });
  }
);

//type loging ise login
//type signin ise signin

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    REGIST_USER: (state, { type, payload }) => {
      const { email, password, firstName, lastName } = payload;
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log('Registered: ', cred.user);

          updateProfile(cred.user, {
            displayName: `${firstName} ${lastName}`,
          });
        })
        .catch((err) =>
          console.log('Kayıt sırasında bir hata oldu: ', err.message)
        );
    },
    LOGIN_USER: (state, { type, payload }) => {
      const { email, password } = payload;
      console.log('Payload: ', type);
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
  },
  extraReducers: (builder) => {
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.userStatus = true;
      state.userName = auth.currentUser.displayName;
      state.email = auth.currentUser.email;
    });
    builder.addCase(saveUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.userStatus = false;
    });
  },
});

export default userSlice.reducer;
export const { REGIST_USER, LOGIN_USER } = userSlice.actions;
