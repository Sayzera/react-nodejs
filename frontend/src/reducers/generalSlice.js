import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibleRegisterForm: false,
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setVisibleRegisterForm: (state, action) => {
      state.visibleRegisterForm = action.payload;
    },
  },
});

export const { setVisibleRegisterForm } = generalSlice.actions;
export default generalSlice.reducer;

// Selectors

export const selectVisibleRegisterForm = (state) =>
  state.general.visibleRegisterForm;
