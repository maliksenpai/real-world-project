import { BaseUrl } from "../utils/SharePoint";

export async function login({ email, password }) {
  const response = await fetch(BaseUrl + "users/login", {
    method: "post",
    body: JSON.stringify({ user: { email, password } }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function register({ email, username, password }) {
  const response = await fetch(BaseUrl + "users", {
    method: "post",
    body: JSON.stringify({ user: { email, username, password } }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function getCurrentUser(token) {
  const response = await fetch(BaseUrl + "user", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export async function getUser({ user }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "profiles/" + user, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: !token ? null : `Token ${token}`,
    },
  });
  const json = await response.json();
  return json.profile;
}

export async function updateUser(userInformation) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "user", {
    method: "put",
    body: JSON.stringify({ user: { ...userInformation } }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

export async function followUser({ user }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "profiles/" + user + "/follow", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  const json = await response.json();
  return json;
}

export async function unfollowUser({ user }) {
  const token = localStorage.getItem("user");
  const response = await fetch(BaseUrl + "profiles/" + user + "/follow", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  const json = await response.json();
  return json;
}
