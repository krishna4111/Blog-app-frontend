import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null; //to remove the error from the previous try
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
  },
});

export const { signInStart, signInFailure, signInSuccess, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
