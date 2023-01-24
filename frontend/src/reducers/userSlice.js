import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  user: null,
}

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export const {} = userSlice.actions
export default userSlice.reducer
