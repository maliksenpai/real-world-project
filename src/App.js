import "./App.css";
import { MainAppBar } from "./view/MainAppBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FeedPage } from "./page/FeedPage";
import { FeedDetailPage } from "./page/FeedDetailPage";
import { SignInPage } from "./page/SignInPage";
import { SignUpPage } from "./page/SignUpPage";
import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./data/UserData";
import { SettingsPage } from "./page/SettingsPage";
import { ProfilePage } from "./page/ProfilePage";
import { EditorPage } from "./page/EditorPage";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("user")) {
      setLoading(true);
      getCurrentUser(localStorage.getItem("user")).then((value) => {
        setUser(value.user);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div />
      ) : (
        <BrowserRouter>
          <MainAppBar />
          <Routes>
            <Route path={"/"} element={<FeedPage />} />
            <Route path={"/article/:slug"} element={<FeedDetailPage />} />
            <Route
              path={"/login"}
              element={
                localStorage.getItem("user") ? (
                  <Navigate to={"/"} />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path={"/register"}
              element={
                localStorage.getItem("user") ? (
                  <Navigate to={"/"} />
                ) : (
                  <SignUpPage />
                )
              }
            />
            <Route
              path={"/settings"}
              element={
                !localStorage.getItem("user") ? (
                  <Navigate to={"/"} />
                ) : (
                  <SettingsPage />
                )
              }
            />
            <Route path={"/@:username"} element={<ProfilePage />} />
            <Route
              path={"/editor"}
              element={
                !localStorage.getItem("user") ? (
                  <Navigate to={"/"} />
                ) : (
                  <EditorPage />
                )
              }
            />
            <Route
              path={"/editor/:slug"}
              element={
                !localStorage.getItem("user") ? (
                  <Navigate to={"/"} />
                ) : (
                  <EditorPage />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </UserContext.Provider>
  );
}

export default App;
