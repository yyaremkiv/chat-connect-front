import { createSlice } from "@reduxjs/toolkit";
import PostsOperation from "./postsOperations.js";

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
    builder.addCase(PostsOperation.fetchPosts.pending, (state, action) => {
      if (!action.meta.arg.isLoadMore) state.posts = [];
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.fetchPosts.fulfilled, (state, action) => {
      if (action.payload.isLoadMore) {
        state.posts = [...state.posts, ...action.payload.data.posts];
      } else {
        state.posts = action.payload.data.posts;
      }
      state.totalCounts = action.payload.data.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.createPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.createPost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.totalCounts = action.payload.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.createPost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.updatePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.updatePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.totalCounts = action.payload.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.updatePost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.patchLike.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.patchLike.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.patchLike.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.deletePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.deletePost.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.totalCounts = action.payload.totalCounts;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.deletePost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.addComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.addComment.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.addComment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.deleteComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.deleteComment.fulfilled, (state, action) => {
      const updatePost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatePost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatePost;
      }
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.deleteComment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.updateComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.updateComment.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.updateComment.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.fetchComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(PostsOperation.fetchComments.fulfilled, (state, action) => {
      const updatedPost = action.payload.data;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        if (action.payload.isLoadMore) {
          state.posts[postIndex].comments.push(...updatedPost.comments);
        } else {
          state.posts[postIndex] = updatedPost;
        }
      }
      state.isLoading = false;
    });
    builder.addCase(PostsOperation.fetchComments.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default postsSlice.reducer;
