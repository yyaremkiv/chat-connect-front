import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  getAllUsers,
  getUserFriends,
  addRemoveUserFriend,
  changeUserAvatar,
} from "./userOperations";
import UserOperations from "./userOperations";

const initialState = {
  user: { data: [], isLoading: false, error: null },
  allUsers: { data: [], totalCounts: 0, isLoading: false, error: null },
  friends: { data: [], isLoading: false, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(UserOperations.getUser.pending, (state) => {
      state.user.data = [];
      state.user.error = null;
      state.user.isLoading = true;
    });
    builder.addCase(UserOperations.getUser.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(UserOperations.getUser.rejected, (state, action) => {
      state.user.error = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(UserOperations.getAllUsers.pending, (state) => {
      state.allUsers.data = [];
      state.allUsers.isLoading = true;
      state.allUsers.error = null;
    });
    builder.addCase(UserOperations.getAllUsers.fulfilled, (state, action) => {
      if (action.payload.isLoadMore) {
        state.allUsers.data = [
          ...state.allUsers.data,
          ...action.payload.data.users,
        ];
      } else {
        state.allUsers.data = action.payload.data.users;
      }
      state.allUsers.totalCounts = action.payload.data.totalCounts;
      state.allUsers.isLoading = false;
    });
    builder.addCase(UserOperations.getAllUsers.rejected, (state, action) => {
      state.allUsers.error = action.payload;
      state.allUsers.isLoading = false;
    });
    builder.addCase(UserOperations.getUserFriends.pending, (state) => {
      state.friends.error = null;
      state.friends.isLoading = true;
    });
    builder.addCase(
      UserOperations.getUserFriends.fulfilled,
      (state, action) => {
        state.friends.data = action.payload.friends;
        state.friends.isLoading = false;
      }
    );
    builder.addCase(UserOperations.getUserFriends.rejected, (state, action) => {
      state.friends.error = action.payload;
      state.friends.isLoading = false;
    });
    builder.addCase(UserOperations.addRemoveUserFriend.pending, (state) => {
      state.friends.error = null;
      state.friends.isLoading = true;
    });
    builder.addCase(
      UserOperations.addRemoveUserFriend.fulfilled,
      (state, action) => {
        state.friends.data = action.payload.friends;
        state.friends.isLoading = false;
      }
    );
    builder.addCase(
      UserOperations.addRemoveUserFriend.rejected,
      (state, action) => {
        state.friends.error = action.payload;
        state.friends.isLoading = false;
      }
    );
    builder.addCase(UserOperations.changeAvatarUser.pending, (state) => {
      state.user.isLoading = true;
      state.user.error = null;
    });
    builder.addCase(
      UserOperations.changeAvatarUser.fulfilled,
      (state, action) => {
        state.user.data = action.payload;
        state.user.isLoading = false;
      }
    );
    builder.addCase(
      UserOperations.changeAvatarUser.rejected,
      (state, action) => {
        state.user.error = action.payload;
        state.user.isLoading = false;
      }
    );
    builder.addCase(UserOperations.updateUser.pending, (state) => {
      state.user.isLoading = true;
      state.user.error = null;
    });
    builder.addCase(UserOperations.updateUser.fulfilled, (state, action) => {
      state.user.data = action.payload;
      state.user.isLoading = false;
    });
    builder.addCase(UserOperations.updateUser.rejected, (state, action) => {
      state.user.error = action.payload;
      state.user.isLoading = false;
    });
  },
});

export default userSlice.reducer;
