import { createSlice } from "@reduxjs/toolkit";
import { getMyArticles, getMyFavoritedArticles } from "../action/ProfileAction";

const initialState = {
  loading: true,
  myArticles: null,
  totalMyArticles: null,
  favoritedArticles: null,
  totalFavoritedArticles: null,
  error: "",
  myArticlesMap: {},
  myFavoritedArticlesMap: {},
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyArticles.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.myArticles = null;
      return copyState;
    });
    builder.addCase(getMyArticles.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loading = false;
      copyState.myArticles = action.payload.response.articles;
      const copyArticles = { ...copyState.myArticlesMap };
      copyArticles[action.payload.response.page] =
        action.payload.response.articles;
      copyState.myArticlesMap = copyArticles;
      copyState.totalMyArticles = action.payload.response.articlesCount;
      return copyState;
    });
    builder.addCase(getMyFavoritedArticles.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.favoritedArticles = null;
      return copyState;
    });
    builder.addCase(getMyFavoritedArticles.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loading = false;
      copyState.favoritedArticles = action.payload.response.articles;
      const copyArticles = { ...copyState.myFavoritedArticlesMap };
      copyArticles[action.payload.response.page] =
        action.payload.response.articles;
      copyState.myFavoritedArticlesMap = copyArticles;
      copyState.totalFavoritedArticles = action.payload.response.articlesCount;
      return copyState;
    });
  },
});
