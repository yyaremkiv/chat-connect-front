import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", formData);
      return response;
    } catch (err) {
      return err.message;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", values);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/auth/logout");
      clearAuthHeader();
      return response.data;
    } catch (err) {
      return err.message;
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
      setAuthHeader(persistedToken);
      const response = await axios.get("auth/refresh", {
        headers: {
          Authorization: `Bearer ${persistedToken}`,
        },
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
