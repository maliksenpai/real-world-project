import { createSlice } from "@reduxjs/toolkit";
import { signInAction } from "../action/SignInAction";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

export const SignInSlice = createSlice({
  name: "signIn",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInAction.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.user = null;
      return copyState;
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      const copyState = { ...state };
      const response = action.payload.payload.response;
      copyState.loading = false;
      if (response.errors) {
        copyState.error = response.errors;
        copyState.user = null;
      } else {
        copyState.error = "";
        copyState.user = response.user;
        localStorage.setItem("user", response.user.token);
      }
      return copyState;
    });
  },
});
