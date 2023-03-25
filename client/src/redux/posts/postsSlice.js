import { createSlice } from "@reduxjs/toolkit";
import {
  getPosts,
  getUserPosts,
  getFriends,
  createNewPost,
  patchLike,
  getUser,
  patchFriend,
  deletePost,
  addComment,
  deleteComment,
} from "./postsOperations";

const initialState = {
  mode: "light",
  currentUser: null,
  friends: { data: [], isLoading: false, error: "" },
  posts: [],
  isLoading: false,
  error: null,
  errorComments: null,
};

const postsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getFriends.pending, (state) => {});
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends.data = action.payload;
    });
    builder.addCase(getFriends.rejected, (state, action) => {});
    builder.addCase(createNewPost.pending, (state) => {});
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(createNewPost.rejected, (state, action) => {});
    builder.addCase(patchLike.pending, (state) => {});
    builder.addCase(patchLike.fulfilled, (state, action) => {
      const updatedPost = action.payload;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = updatedPost;
      }
    });
    builder.addCase(patchLike.rejected, (state, action) => {});
    builder.addCase(getUser.pending, (state) => {});
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {});
    builder.addCase(patchFriend.pending, (state) => {});
    builder.addCase(patchFriend.fulfilled, (state, action) => {
      console.log(action.payload);
      state.friends.data = action.payload;
    });
    builder.addCase(patchFriend.rejected, (state, action) => {});
    builder.addCase(deletePost.pending, (state) => {});
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log(action.payload);
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.errorComments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.errorComments = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  postsSlice.actions;
export default postsSlice.reducer;
