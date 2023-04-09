import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  updateUser,
  sendPasswordEmail,
} from "./authOperations";
import AuthOperations from "./authOperations";

const initialState = {
  user: [],
  token: null,
  isLogged: false,
  isLoading: false,
  isRegistred: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.error = null;
      state.isRedirect = false;
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isRegistred = true;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isRedirect = false;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.token = null;
      state.error = action.payload;
      state.isLogged = false;
      state.isLoading = false;
    });
    // builder.addCase(updateUser.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   state.isLogged = true;
    //   state.isLoading = false;
    // });
    // builder.addCase(updateUser.rejected, (state, action) => {
    //   state.isLoading = false;
    // });
    builder.addCase(AuthOperations.refresh.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(AuthOperations.refresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLogged = true;
      state.isLoading = false;
    });
    builder.addCase(AuthOperations.refresh.rejected, (state, action) => {
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
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(sendPasswordEmail.pending, (state) => {});
    builder.addCase(sendPasswordEmail.fulfilled, (state, action) => {});
    builder.addCase(sendPasswordEmail.rejected, (state, action) => {});
  },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
