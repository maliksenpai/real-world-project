import { createSlice } from "@reduxjs/toolkit";
import {
  changeFavoriteArticle,
  changeFollowUser,
  deleteArticle,
  getArticlesWithTag,
  getArticleWithSlug,
  getGlobalFeed,
  getTags,
  getUserFeed,
} from "../action/FeedAction";

const initialState = {
  loading: false,
  feedArticles: null,
  globalArticles: null,
  loadingTags: false,
  tags: null,
  error: "",
  selectedTag: null,
  tagArticles: null,
  selectedArticle: null,
  isLoadingFollow: false,
  isLoadingFavorite: false,
  isLoadingDelete: false,
  feedArticleMap: {},
  totalFeedArticle: null,
  globalArticleMap: {},
  totalGlobalArticle: null,
  tagArticleMap: {},
  totalTagArticle: null,
};

export const FeedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserFeed.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.feedArticles = null;
      return copyState;
    });
    builder.addCase(getUserFeed.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loading = false;
      const copyArticles = { ...copyState.feedArticleMap };
      copyArticles[action.payload.response.page] =
        action.payload.response.articles;
      copyState.feedArticleMap = copyArticles;
      copyState.totalFeedArticle = action.payload.response.articlesCount;
      return copyState;
    });
    builder.addCase(getGlobalFeed.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.globalArticles = null;
      return copyState;
    });
    builder.addCase(getGlobalFeed.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loading = false;
      const copyArticles = { ...copyState.globalArticleMap };
      copyArticles[action.payload.response.page] =
        action.payload.response.articles;
      copyState.globalArticleMap = copyArticles;
      copyState.totalGlobalArticle = action.payload.response.articlesCount;

      return copyState;
    });
    builder.addCase(getTags.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loadingTags = true;
      copyState.tags = null;
      return copyState;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loadingTags = false;
      copyState.tags = action.payload.response.tags;
      return copyState;
    });
    builder.addCase(getArticlesWithTag.pending, (state, action) => {
      const copyState = { ...state };
      copyState.isLoading = true;
      copyState.selectedTag = action.meta.arg.tag;
      return copyState;
    });
    builder.addCase(getArticlesWithTag.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.isLoading = false;
      const copyArticles = { ...copyState.tagArticleMap };
      copyArticles[action.payload.response.page] =
        action.payload.response.articles;
      copyState.tagArticleMap = copyArticles;
      copyState.totalTagArticle = action.payload.response.articlesCount;
      return copyState;
    });
    builder.addCase(getArticleWithSlug.pending, (state, action) => {
      const copyState = { ...state };
      copyState.selectedArticle = null;
      return copyState;
    });
    builder.addCase(getArticleWithSlug.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.selectedArticle = action.payload.response;
      return copyState;
    });
    builder.addCase(changeFollowUser.pending, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingFollow = true;
      return copyState;
    });
    builder.addCase(changeFollowUser.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingFollow = false;
      const copySelectedArticle = { ...copyState.selectedArticle };
      const copyAuthor = { ...copySelectedArticle.author };
      copyAuthor.following = action.payload.response.profile.following;
      copySelectedArticle.author = copyAuthor;
      copyState.selectedArticle = copySelectedArticle;
      return copyState;
    });
    builder.addCase(changeFavoriteArticle.pending, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingFavorite = true;
      return copyState;
    });
    builder.addCase(changeFavoriteArticle.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingFavorite = false;
      const copySelectedArticle = { ...copyState.selectedArticle };
      copySelectedArticle.favorited = action.payload.response.article.favorited;
      copySelectedArticle.favoritesCount =
        action.payload.response.article.favoritesCount;
      copyState.selectedArticle = copySelectedArticle;
      return copyState;
    });
    builder.addCase(deleteArticle.pending, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingDelete = true;
      return copyState;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.isLoadingDelete = false;
      return copyState;
    });
  },
});
