import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { userId = null, page = 1, limit = 10, sort = "desc", isLoadMore = false },
    thunkAPI
  ) => {
    try {
      const url = userId
        ? `/posts/${userId}/posts?page=${page}&limit=${limit}&sort=${sort}`
        : `/posts?page=${page}&limit=${limit}&sort=${sort}`;
      const { data } = await axiosAPI.get(url);

      return isLoadMore
        ? { data, isLoadMore: true }
        : { data, isLoadMore: false };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async ({ page = 1, limit = 10, sort = "desc", formData }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.post(
        `/posts?page=${page}&limit=${limit}&sort=${sort}`,
        formData
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, page = 1, limit = 10, sort = "desc" }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.delete(
        `/posts/${postId}/delete?page=${page}&limit=${limit}&sort=${sort}`
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const patchLike = createAsyncThunk(
  "posts/patchLike",
  async ({ postId, userId }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/posts/${postId}/like`, {
        userId,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/posts/${postId}/comment`, {
        text,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, created }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/posts/${postId}/comment/delete`, {
        created,
      });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
