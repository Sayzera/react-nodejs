import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Cookies.set("user", JSON.stringify(action.payload))
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer

// Selectors

export const selectUser = (state) => state.user.user
