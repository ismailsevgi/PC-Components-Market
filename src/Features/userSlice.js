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
};

const userSlice = createSlice({
  name: 'userInfos',
  initialState,
  reducers: {
    SET_USER: (state, { type, payload }) => {
      console.log('Gelen type: ', type, ' payload: ', payload);

      return {
        ...payload,
      };
    },
  },
});

export default userSlice.reducer;
export const { SET_USER } = userSlice.actions;
