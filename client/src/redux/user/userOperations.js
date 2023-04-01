import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";
import { setAuthorizationHeader } from "configs/axios.configs";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const persistedToken = state.auth.token;

      // if (persistedToken === null) {
      //   return thunkAPI.rejectWithValue("Unable to fetch user");
      // }

      // setAuthorizationHeader(persistedToken);
      const { data } = await axiosAPI.get(`/user/${userId}`);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get("/user/list");
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUserFriends = createAsyncThunk(
  "user/getUserFriends",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/user/${userId}/friends`);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addRemoveUserFriend = createAsyncThunk(
  "user/addRemoveUserFriend",
  async ({ userId, friendId }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/user/${userId}/${friendId}`);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const changeUserAvatar = createAsyncThunk(
  "user/changeUserAvatar",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch("/user/avatar", formData);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);
