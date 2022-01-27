import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteArticleData,
  favoriteArticle,
  getArticlesWithTagData,
  getArticleWithSlugData,
  getGlobalFeedData,
  getTagsData,
  getUserFeedData,
  unFavoriteArticle,
} from "../../data/ArticleData";
import { followUser, unfollowUser } from "../../data/UserData";

export const getUserFeed = createAsyncThunk("getUserFeed", async ({ page }) => {
  const response = await getUserFeedData({ page });
  return {
    response: response,
  };
});

export const getGlobalFeed = createAsyncThunk(
  "getGlobalFeed",
  async ({ page }) => {
    const response = await getGlobalFeedData({ page });
    return {
      response: response,
    };
  }
);

export const getTags = createAsyncThunk("getTags", async () => {
  const response = await getTagsData();
  return {
    response: response,
  };
});

export const getArticlesWithTag = createAsyncThunk(
  "getArticlesWithTag",
  async ({ tag, page }) => {
    const response = await getArticlesWithTagData({ tag, page });
    return {
      response: response,
    };
  }
);

export const getArticleWithSlug = createAsyncThunk(
  "getArticleWithSlug",
  async ({ slug }) => {
    const response = await getArticleWithSlugData({ slug: slug });
    return {
      response: response,
    };
  }
);

export const changeFollowUser = createAsyncThunk(
  "followUser",
  async ({ username, following }) => {
    let response;
    if (following) {
      response = await unfollowUser({ user: username });
    } else {
      response = await followUser({ user: username });
    }
    return {
      response: response,
    };
  }
);

export const changeFavoriteArticle = createAsyncThunk(
  "changeFavoriteArticle",
  async ({ slug, favorited }) => {
    let response;
    if (!favorited) {
      response = await favoriteArticle({ slug: slug });
    } else {
      response = await unFavoriteArticle({ slug: slug });
    }
    return {
      response: response,
    };
  }
);

export const deleteArticle = createAsyncThunk(
  "deleteArticle",
  async ({ slug }) => {
    const response = await deleteArticleData({ slug: slug });
    return {
      response: response,
    };
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async ({ slug, commentId }) => {
    const response = await deleteComment({ slug: slug, commentId: commentId });
    return {
      response: response,
    };
  }
);
