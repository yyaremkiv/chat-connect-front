import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createNewPost,
  deletePost,
  patchLike,
  addComment,
  deleteComment,
} from "./postsOperations";

const initialState = {
  posts: [],
  totalCounts: 1,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      if (action.payload.isLoadMore) {
        state.posts = [...state.posts, ...action.payload.data.posts];
        state.totalCounts = action.payload.data.totalCounts;
      } else {
        state.posts = action.payload.data.posts;
        state.totalCounts = action.payload.data.totalCounts;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createNewPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.totalCounts = action.payload.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(patchLike.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(patchLike.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(patchLike.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.totalCounts = action.payload.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      console.log(postIndex);
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
