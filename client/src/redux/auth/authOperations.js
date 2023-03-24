import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";
import { setAuthorizationHeader } from "configs/axios.configs";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosAPI.post("/auth/register", formData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const { data } = await axiosAPI.post("/auth/login", values);
      setAuthorizationHeader(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get("/auth/logout");
      setAuthorizationHeader(null);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthorizationHeader(persistedToken);
      const { data } = await axiosAPI.get("auth/refresh");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
  }
);
