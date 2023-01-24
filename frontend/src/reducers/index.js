import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './generalSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    general: generalSlice,
  },
});

export { store };
