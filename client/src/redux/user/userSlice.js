import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  getAllUsers,
  getUserFriends,
  addRemoveUserFriend,
  changeUserAvatar,
} from "./userOperations";

const initialState = {
  allUsers: { data: [], isLoading: false, error: null },
  user: { data: [], isLoading: false, error: null },
  friends: { data: [], isLoading: false, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.user.error = null;
      state.user.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.user.error = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.allUsers.isLoading = true;
      state.allUsers.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.allUsers.data = action.payload;
      state.allUsers.isLoading = false;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.allUsers.error = action.payload;
      state.allUsers.isLoading = false;
    });
    builder.addCase(getUserFriends.pending, (state) => {
      state.friends.error = null;
      state.friends.isLoading = true;
    });
    builder.addCase(getUserFriends.fulfilled, (state, action) => {
      state.friends.data = action.payload.friends;
      state.friends.isLoading = false;
    });
    builder.addCase(getUserFriends.rejected, (state, action) => {
      state.friends.error = action.payload;
      state.friends.isLoading = false;
    });
    builder.addCase(addRemoveUserFriend.pending, (state) => {
      state.friends.error = null;
      state.friends.isLoading = true;
    });
    builder.addCase(addRemoveUserFriend.fulfilled, (state, action) => {
      state.friends.data = action.payload.friends;
      state.friends.isLoading = false;
    });
    builder.addCase(addRemoveUserFriend.rejected, (state, action) => {
      state.friends.error = action.payload;
      state.friends.isLoading = false;
    });
    builder.addCase(changeUserAvatar.pending, (state) => {
      state.user.isLoading = true;
      state.user.error = null;
    });
    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(changeUserAvatar.rejected, (state, action) => {
      state.user.error = action.payload;
      state.user.isLoading = false;
    });
  },
});

export default userSlice.reducer;
