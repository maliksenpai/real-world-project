import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "../../data/UserData";

export const signUpAction = createAsyncThunk(
  "signUp",
  async ({ email, username, password }) => {
    const response = await register({ email, username, password });
    return {
      payload: {
        response: response,
      },
    };
  }
);
