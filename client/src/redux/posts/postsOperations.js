import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAPI } from "configs/axios.configs";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get("/posts");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/posts/${userId}/posts`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getFriends = createAsyncThunk(
  "posts/getFriends",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/users/${userId}/friends`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axiosAPI.post("/posts", formData);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const patchLike = createAsyncThunk(
  "posts/patchLike",
  async ({ postId, loggedInUserId }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(
        `/posts/${postId}/like`,
        { userId: loggedInUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, userId, text }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/posts/${postId}/comment`, {
        text,
        userId,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/posts/${postId}/comment/delete`, {
        text,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUser = createAsyncThunk(
  "posts/getUser",
  async (userId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.get(`/users/${userId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const patchFriend = createAsyncThunk(
  "post/patchFriend",
  async ({ userId, friendId }, thunkAPI) => {
    try {
      const { data } = await axiosAPI.patch(`/users/${userId}/${friendId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
    try {
      const { data } = await axiosAPI.delete(`/posts/${postId}/delete`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
