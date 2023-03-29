import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";

export const getFriends = createAsyncThunk(
  "user/getFriends",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/users/${userId}/friends`);
      return data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.message);
    }
  }
);
