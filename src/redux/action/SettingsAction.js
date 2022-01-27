import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "../../data/UserData";

export const settingsAction = createAsyncThunk(
  "settings",
  async ({ image, username, bio, email, password }) => {
    const response = await updateUser({
      image,
      username,
      bio,
      email,
      password,
    });
    return {
      payload: {
        response: response,
      },
    };
  }
);
