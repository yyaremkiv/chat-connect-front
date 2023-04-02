import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/user/${userId}`);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async ({ page = 1, limit = 10, sort = "desc" }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(
        `/user/list?page=${page}&limit=${limit}&sort=${sort}`
      );
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
