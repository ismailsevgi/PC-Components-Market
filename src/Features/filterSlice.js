import { createSlice } from '@reduxjs/toolkit';

//dashboard da type: "user" olacak
const initialState = {
  type: 'filtering',
  label: 'all',
  placement: 'newest',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    SET_FILTER: (state, { type, payload }) => {
      console.log('Gelen type: ', type, ' payload: ', payload);

      return {
        ...state,
        label: payload.label,
        type: payload.type,
      };
    },
    SET_PLACEMENT: (state, { type, payload }) => {
      return {
        ...state,
        placement: payload,
      };
    },
  },
});

export default filterSlice.reducer;
export const { SET_FILTER, SET_PLACEMENT } = filterSlice.actions;
