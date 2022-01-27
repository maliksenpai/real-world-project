import { BaseUrl } from "../utils/SharePoint";

const offset = 10;

export async function getMyArticlesData({ username, page }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl +
      "articles?" +
      new URLSearchParams({
        author: username,
        offset: (offset * Number(page)).toString(),
      }),
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? null : `Token ${token}`,
      },
    }
  );
  const json = await response.json();
  json.page = page;
  return json;
}

export async function getMyFavoritedArticlesData({ username, page }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl +
      "articles?" +
      new URLSearchParams({
        favorited: username,
        offset: (offset * Number(page)).toString(),
      }),
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? null : `Token ${token}`,
      },
    }
  );
  const json = await response.json();
  json.page = page;
  return json;
}

export async function favoriteArticle({ slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug + "/favorite", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  const json = await response.json();
  return json;
}

export async function unFavoriteArticle({ slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug + "/favorite", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  const json = await response.json();
  return json;
}

export async function getUserFeedData({ page }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl +
      "/articles/feed?" +
      new URLSearchParams({ offset: (offset * Number(page)).toString() }),
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  const json = await response.json();
  json.page = page;
  return json;
}

export async function getGlobalFeedData({ page }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl +
      "articles?" +
      new URLSearchParams({ offset: (offset * Number(page)).toString() }),
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? null : `Token ${token}`,
      },
    }
  );
  const json = await response.json();
  json.page = page;
  return json;
}

export async function getTagsData() {
  const response = await fetch(BaseUrl + "tags", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function getArticlesWithTagData({ tag, page }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl +
      "articles?" +
      new URLSearchParams({
        tag: tag,
        offset: (offset * Number(page)).toString(),
      }),
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: !token ? null : `Token ${token}`,
      },
    }
  );
  const json = await response.json();
  json.page = page;
  return json;
}

export async function createArticleData({ title, description, body, tagList }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles", {
    method: "post",
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export async function updateArticleData({
  title,
  description,
  body,
  tagList,
  slug,
}) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug, {
    method: "put",
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        body: body,
        tagList: tagList,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export async function getArticleWithSlugData({ slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: !token ? null : `Token ${token}`,
    },
  });
  const json = await response.json();
  return json.article;
}

export async function getCommentsWithSlug({ slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug + "/comments", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: !token ? null : `Token ${token}`,
    },
  });
  const json = await response.json();
  return json.comments;
}

export async function sendComment({ comment, slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug + "/comments", {
    method: "post",
    body: JSON.stringify({ comment: { body: comment } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json.comment;
}

export async function deleteArticleData({ slug }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "articles/" + slug, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export async function deleteCommentData({ slug, commentId }) {
  const token = localStorage.getItem("user");
  const response = await fetch(
    BaseUrl + "articles/" + slug + "/comments/" + commentId,
    {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
}
