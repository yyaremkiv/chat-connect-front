import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsServices from "../../services/PostsServices.js";

class PostsOperations {
  static fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (
      {
        userId = null,
        page = 1,
        limit = 10,
        sort = "desc",
        isLoadMore = false,
      },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.fetchPosts(
          userId,
          page,
          limit,
          sort
        );

        return isLoadMore
          ? { data, isLoadMore: true }
          : { data, isLoadMore: false };
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static createPost = createAsyncThunk(
    "posts/createPost",
    async (
      { page = 1, limit = 10, sort = "desc", formData },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.createPost(
          page,
          limit,
          sort,
          formData
        );
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static updatePost = createAsyncThunk(
    "posts/updatePost",
    async (formData, { rejectWithValue }) => {
      try {
        const { data } = await PostsServices.updatePost(formData);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static deletePost = createAsyncThunk(
    "post/deletePost",
    async (
      { postId, page = 1, limit = 10, sort = "desc" },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.deletePost(
          postId,
          page,
          limit,
          sort
        );
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static patchLike = createAsyncThunk(
    "posts/patchLike",
    async ({ postId, userId }, { rejectWithValue }) => {
      try {
        const { data } = await PostsServices.patchLike(postId, userId);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static fetchComments = createAsyncThunk(
    "posts/fetchComments",
    async (
      { postId, page = 1, limit = 10, sort = "desc", isLoadMore = false },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.fetchComments({
          postId,
          page,
          limit,
          sort,
          isLoadMore,
        });

        return isLoadMore
          ? { data, isLoadMore: true }
          : { data, isLoadMore: false };
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addComment = createAsyncThunk(
    "posts/addComment",
    async (
      { postId, commentText, page = 1, limit = 10, sort = "desc" },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.addComment({
          postId,
          commentText,
          page,
          limit,
          sort,
        });

        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static updateComment = createAsyncThunk(
    "posts/updateComment",
    async ({ postId, commentId, commentText }, { rejectWithValue }) => {
      try {
        const { data } = await PostsServices.updateComment({
          postId,
          commentId,
          commentText,
        });

        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async (
      { postId, commentId, page = 1, limit = 10, sort = "desc" },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await PostsServices.deleteComment({
          postId,
          commentId,
          page,
          limit,
          sort,
        });
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
}

export default PostsOperations;
