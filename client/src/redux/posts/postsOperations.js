import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/posts");
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/posts/${userId}/posts`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getFriends = createAsyncThunk(
  "posts/getFriends",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${userId}/friends`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/posts", formData);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const patchLike = createAsyncThunk(
  "posts/patchLike",
  async ({ postId, loggedInUserId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/posts/${postId}/like`,
        { userId: loggedInUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, userId, text }, thunkAPI) => {
    try {
      const response = await axios.patch(`/posts/${postId}/comment`, {
        text,
        userId,
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      const response = await axios.patch(`/posts/${postId}/comment/delete`, {
        text,
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUser = createAsyncThunk(
  "posts/getUser",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const patchFriend = createAsyncThunk(
  "post/patchFriend",
  async ({ userId, friendId }, thunkAPI) => {
    try {
      const response = await axios.patch(`/users/${userId}/${friendId}`);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
    try {
      const response = await axios.delete(`/posts/${postId}/delete`);
      console.log("response", response);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
