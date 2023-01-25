<<<<<<< HEAD
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
}
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};
>>>>>>> 89692fc014c47216612449ef706815e9445b0243

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
<<<<<<< HEAD
      Cookies.set("user", JSON.stringify(action.payload))
      state.user = action.payload
=======
      Cookies.set('user', JSON.stringify(action.payload));
      state.user = action.payload;
>>>>>>> 89692fc014c47216612449ef706815e9445b0243
    },
  },
  extraReducers: (builder) => {},
});

<<<<<<< HEAD
export const { setUserData } = userSlice.actions
export default userSlice.reducer

// Selectors

export const selectUser = (state) => state.user.user
=======
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

// Selectors

export const selectUser = (state) => state.user.user;
>>>>>>> 89692fc014c47216612449ef706815e9445b0243
