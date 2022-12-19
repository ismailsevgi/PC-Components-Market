import { createSlice } from '@reduxjs/toolkit';

//dashboard da type: "user" olacak
const initialState = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
  userFavorites: [],
  userBasket: [],
  userStatus: false,
  userDocId: '',
  userName: '',
  userStatus: false,
};

const userSlice = createSlice({
  name: 'userInfos',
  initialState,
  reducers: {
    SET_USER: (state, { type, payload }) => {
      return {
        ...payload,
      };
    },
    SET_USER_PHOTO: (state, { payload }) => {
      return {
        ...state,
        photoURL: payload,
      };
    },
    SET_USER_NAME: (state, { payload }) => {
      return {
        ...state,
        displayName: payload.displayName,
        email: payload.email,
      };
    },
  },
});

export default userSlice.reducer;
export const { SET_USER, SET_USER_PHOTO, SET_USER_NAME } = userSlice.actions;
