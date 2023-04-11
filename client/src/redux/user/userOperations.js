import { createAsyncThunk } from "@reduxjs/toolkit";
import UserServices from "services/UserServices";

class UserOperations {
  static getUser = createAsyncThunk(
    "user/getUser",
    async (userId, { rejectWithValue }) => {
      try {
        const { data } = await UserServices.getUser(userId);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (
      { page = 1, limit = 10, sort = "desc", isLoadMore = false },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await UserServices.getAllUsers(page, limit, sort);
        return isLoadMore
          ? { data, isLoadMore: true }
          : { data, isLoadMore: false };
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static updateUser = createAsyncThunk(
    "user/updateUser",
    async (values, { rejectWithValue }) => {
      try {
        const { data } = await UserServices.updateUser(values);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static getUserFriends = createAsyncThunk(
    "user/getUserFriends",
    async (userId, { rejectWithValue }) => {
      try {
        const { data } = await UserServices.getUserFriends(userId);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addRemoveUserFriend = createAsyncThunk(
    "user/addRemoveUserFriend",
    async ({ userId, friendId }, { rejectWithValue }) => {
      try {
        const { data } = await UserServices.addRemoveUserFriend(
          userId,
          friendId
        );

        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static changeAvatarUser = createAsyncThunk(
    "user/changeUserAvatar",
    async (formData, { rejectWithValue }) => {
      try {
        const { data } = await UserServices.changeAvatarUser(formData);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
}

export default UserOperations;
