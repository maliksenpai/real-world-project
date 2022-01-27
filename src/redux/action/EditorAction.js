import { createAsyncThunk } from "@reduxjs/toolkit";
import { createArticleData, updateArticleData } from "../../data/ArticleData";

export const createArticle = createAsyncThunk(
  "createArticle",
  async ({ article }) => {
    const response = await createArticleData(article);
    return {
      response: response,
    };
  }
);

export const updateArticle = createAsyncThunk(
  "updateArticle",
  async ({ article }) => {
    const response = await updateArticleData(article);
    return {
      response: response,
    };
  }
);

export const clearEditor = () => {
  return {
    type: "clear",
  };
};
