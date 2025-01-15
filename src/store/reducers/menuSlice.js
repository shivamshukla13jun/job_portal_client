import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  menuItems: [],
  isLoading: false,
  error: null,
};

// Menu slice
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchMenuStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchMenuSuccess(state, action) {
      state.menuItems = action.payload;
      state.isLoading = false;
    },
    fetchMenuFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Export actions
export const { fetchMenuStart, fetchMenuSuccess, fetchMenuFailure } = menuSlice.actions;

// Export reducer
export default menuSlice.reducer;
