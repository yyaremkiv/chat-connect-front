import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";

class AuthOperations {
  static login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
      try {
        const { data } = await AuthService.login(email, password);
        return data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  );

  static register = createAsyncThunk(
    "auth/register",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.register(values);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
      const { data } = await AuthService.logout();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  });

  static refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    try {
      const { data } = await AuthService.refresh();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  });
}

export default AuthOperations;
