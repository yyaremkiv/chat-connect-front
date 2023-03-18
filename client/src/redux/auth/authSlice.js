import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
} from "./authOperations";

const initialState = {
  user: [],
  token: null,
  isLogged: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(refreshUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.isLoading = false;
      state.isLogged = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
