import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // Whether the user is logged in
  userData: null, // User data object
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload; // Use action.payload to store data
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Exporting actions for use in components
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;