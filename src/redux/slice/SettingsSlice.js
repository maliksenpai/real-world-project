import { createSlice } from "@reduxjs/toolkit";
import { settingsAction } from "../action/SettingsAction";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

export const SettingsSlice = createSlice({
  name: "settingsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(settingsAction.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.user = null;
      return copyState;
    });
    builder.addCase(settingsAction.fulfilled, (state, action) => {
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
