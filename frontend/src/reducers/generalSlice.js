import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  visibleRegisterForm: false,
  visibleHeaderCard: false,
  showSearchMenu: false,
}

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setVisibleRegisterForm: (state, action) => {
      state.visibleRegisterForm = action.payload
    },
    setVisibleHeaderCard: (state, action) => {
      state.visibleHeaderCard = action.payload
    },
    setShowSearchMenu: (state, action) => {
      state.showSearchMenu = action.payload
    },
  },
})

export const {
  setVisibleRegisterForm,
  setVisibleHeaderCard,
  setShowSearchMenu,
} = generalSlice.actions
export default generalSlice.reducer

// Selectors

export const selectVisibleRegisterForm = (state) =>
  state.general.visibleRegisterForm

export const selectVisibleHeaderCard = (state) =>
  state.general.visibleHeaderCard

export const selectShowSearchMenu = (state) => state.general.showSearchMenu
