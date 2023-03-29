import { createSlice } from "@reduxjs/toolkit";
import { getFriends } from "./userOperations";

const initialState = {
  friends: { data: [], isLoading: false, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFriends.pending, (state) => {
      state.friends.error = null;
      state.friends.isLoading = true;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends.data = action.payload.friends;
      state.friends.isLoading = false;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      state.friends.error = action.payload;
      state.friends.isLoading = false;
    });
  },
});

export default userSlice.reducer;
