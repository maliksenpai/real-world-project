import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyArticlesData,
  getMyFavoritedArticlesData,
} from "../../data/ArticleData";

export const getMyArticles = createAsyncThunk(
  "getMyArticles",
  async ({ username, page }) => {
    const response = await getMyArticlesData({ username, page });
    return {
      response: response,
    };
  }
);

export const getMyFavoritedArticles = createAsyncThunk(
  "getMyFavoritedArticles",
  async ({ username, page }) => {
    const response = await getMyFavoritedArticlesData({ username, page });
    return {
      response: response,
    };
  }
);
