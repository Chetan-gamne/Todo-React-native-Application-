import {configureStore} from '@reduxjs/toolkit';
import TaskDataSlice from './slices/TaskDataSlice';
import DarkModeSlice from './slices/DarkModeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const reducers = combineReducers({
  data: TaskDataSlice,
  dark: DarkModeSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
