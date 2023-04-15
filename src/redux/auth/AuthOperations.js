import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";

class AuthOperations {
  static login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.login(email, password);
        return data;
      } catch (err) {
        return rejectWithValue(err.response);
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
        return rejectWithValue(err.response);
      }
    }
  );

  static logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.logout();
        return data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );

  static refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await AuthService.refresh();
        return data;
      } catch (err) {
        return rejectWithValue(err.response);
      }
    }
  );
}

export default AuthOperations;
