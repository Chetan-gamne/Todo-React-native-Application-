import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [{title: 'Daily meeting with team'}],
};

export const dataSlice = createSlice({
  name: 'taskData',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    removeTask: (state, action) => {
      state.data = state.data.filter(item => item.title != action.payload);
    },
  },
});

export const {addTask, removeTask} = dataSlice.actions;
export const getTask = state => state.data.data;

export default dataSlice.reducer;
