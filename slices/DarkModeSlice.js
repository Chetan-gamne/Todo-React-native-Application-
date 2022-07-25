import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  toggle: true,
};

export const darkSlice = createSlice({
  name: 'darkSlice',
  initialState,
  reducers: {
    toggleState: (state, action) => {
      state.toggle = !state.toggle;
    },
  },
});

export const {toggleState} = darkSlice.actions;
export const getToggleState = state => state.dark.toggle;

export default darkSlice.reducer;
