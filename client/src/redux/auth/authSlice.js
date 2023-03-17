import { createSlice } from "@reduxjs/toolkit";
import { register } from "./authOperations";

const initialState = {
  user: [],
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
