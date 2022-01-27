import {
  Avatar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import "../styles/Profile.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Add, Remove, SettingsOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import {
  getMyArticles,
  getMyFavoritedArticles,
} from "../redux/action/ProfileAction";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getUser, unfollowUser } from "../data/UserData";
import "../styles/Articles.scss";
import { useStyle } from "../utils/MUIData";
import { ArticleListPagination } from "../view/ArticleListPagination";
import { FollowButton } from "../view/FollowButton";

export function ProfilePage() {
  const { user: currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const state = useSelector((state) => state.profileRedux);
  const [followLoading, setFollowLoading] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyle();

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentMap, setCurrentMap] = useState(state.myArticlesMap);

  const handleFollow = () => {
    if (currentUser) {
      setFollowLoading(true);
      if (!user.following) {
        followUser({ user: user.username }).then((value) => {
          setUser({ ...user, following: true });
          setFollowLoading(false);
        });
      } else {
        unfollowUser({ user: user.username }).then((value) => {
          setUser({ ...user, following: false });
          setFollowLoading(false);
        });
      }
    } else {
      navigation("/register");
    }
  };

  const handleChangeTab = (event, newValue) => {
    setPage(0);
    setTabIndex(newValue);
    if (newValue === 0) {
      if (!state.myArticles) {
        dispatch(getMyArticles({ username, page: 0 }));
      }
      setPages(
        Array.from({ length: state.totalMyArticles / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.myArticlesMap);
    } else if (newValue === 1) {
      if (!state.favoritedArticles) {
        dispatch(getMyFavoritedArticles({ username, page: 0 }));
      }
      setPages(
        Array.from(
          { length: state.totalFavoritedArticles / 10 + 1 },
          (_, i) => i
        )
      );
      setCurrentMap(state.myFavoritedArticlesMap);
    }
  };

  useEffect(() => {
    getUser({ user: username }).then((value) => {
      setUser(value);
      setLoading(false);
      if (!state.myArticles) {
        dispatch(getMyArticles({ username, page }));
      }
    });
  }, []);

  useEffect(() => {
    if (tabIndex === 0) {
      setPages(
        Array.from({ length: state.totalMyArticles / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.myArticlesMap);
    } else if (tabIndex === 1) {
      setPages(
        Array.from(
          { length: state.totalFavoritedArticles / 10 + 1 },
          (_, i) => i
        )
      );
      setCurrentMap(state.myFavoritedArticlesMap);
    }
  }, [
    state.myArticles,
    state.favoritedArticles,
    state.myArticlesMap,
    state.myFavoritedArticlesMap,
  ]);

  const changePage = (newPage) => {
    setPage(newPage);
    if (tabIndex === 0) {
      if (!state.myArticlesMap[newPage]) {
        dispatch(getMyArticles({ username, page: newPage }));
      } else {
        setCurrentMap(state.myArticlesMap);
      }
    } else if (tabIndex === 1) {
      if (!state.myFavoritedArticlesMap[newPage]) {
        dispatch(getMyFavoritedArticles({ username, page: newPage }));
      } else {
        setCurrentMap(state.myFavoritedArticlesMap);
      }
    }
  };

  console.log(user);

  return (
    <div>
      {loading ? (
        <div />
      ) : (
        <div className={"profile-container"}>
          <Grid
            className={"profile-background"}
            pt={4}
            pb={1}
            px={20}
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item>
              <Avatar src={user.image} sx={{ height: 100, width: 100 }} />
            </Grid>
            <Grid item>
              <Typography className={"profile-title"}>
                {user.username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={"profile-subtitle"}>{user.bio}</Typography>
            </Grid>
            <Grid item alignSelf={"end"}>
              {!currentUser ? (
                <FollowButton
                  classes={classes}
                  following={user.following}
                  username={user.username}
                  handleFollow={handleFollow}
                  isLoadingFollow={followLoading}
                />
              ) : currentUser.username === username ? (
                <Button
                  classes={{ root: classes.transparent }}
                  variant={"outlined"}
                  startIcon={<SettingsOutlined sx={{ fontSize: 50 }} />}
                  className={"profile-edit-button"}
                  onClick={() => navigation("/settings")}
                >
                  Edit Profile Settings
                </Button>
              ) : (
                <Button
                  classes={{ root: classes.transparent }}
                  className={
                    user.following
                      ? "article-follow-button"
                      : "article-unfollow-button"
                  }
                  variant={user.following ? "contained" : "outlined"}
                  size={"small"}
                  disabled={followLoading}
                  onClick={handleFollow}
                  startIcon={user.following ? <Remove /> : <Add />}
                >
                  {user.following ? "Unfollow" : "Follow"} {user.username}
                </Button>
              )}
            </Grid>
          </Grid>
          <Box pt={2} px={20}>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              TabIndicatorProps={{ style: { backgroundColor: "#5CB85C" } }}
              className={"profile-tabs"}
              textColor={"inherit"}
            >
              <Tab label={"My Articles"} />
              <Tab label={"Favorited Articles"} />
            </Tabs>
            <ArticleListPagination
              isLoading={state.loading}
              map={currentMap}
              page={page}
              pages={pages}
              changePage={(value) => changePage(value)}
            />
          </Box>
        </div>
      )}
    </div>
  );
}
