import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, refreshUser } from "./authOperations";

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
      state.isLoading = false;
    });
  },
  reducers: {
    logoutUser: (state) => {
      state.token = null;
    },
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
