import { createSlice } from '@reduxjs/toolkit';

//dashboard da type: "user" olacak
const initialState = {
  label: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_FILTER: (state, { type, payload }) => {
      console.log('Gelen type: ', type, ' payload: ', payload);

      return {
        label: payload.label,
      };
    },
  },
});

export default filterSlice.reducer;
export const { SET_FILTER } = filterSlice.actions;
