import { createSlice } from "@reduxjs/toolkit";
import AuthOperations from "./AuthOperations.js";

const initialState = {
  user: [],
  isLogged: false,
  isLoading: false,
  accessToken: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(AuthOperations.register.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.register.rejected, (state, action) => {
      state.error = action.payload.data.message;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.login.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.login.rejected, (state, action) => {
      state.error = action.payload.data.message;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.logout.pending, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.logout.fulfilled, (state) => {
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.logout.rejected, (state, action) => {
      state.error = action.payload;
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.refresh.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(AuthOperations.refresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.refresh.rejected, (state, action) => {
      state.error = action.payload;
      state.accessToken = null;
      state.isLogged = false;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
