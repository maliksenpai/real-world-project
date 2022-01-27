import { login } from "../../data/UserData";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInAction = createAsyncThunk(
  "signIn",
  async ({ email, password }) => {
    const response = await login({ email, password });
    return {
      payload: {
        response: response,
      },
    };
  }
);
