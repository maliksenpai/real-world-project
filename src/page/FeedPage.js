import {
  Chip,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticlesWithTag,
  getGlobalFeed,
  getTags,
  getUserFeed,
} from "../redux/action/FeedAction";
import "../styles/Feed.scss";
import { ArticleListPagination } from "../view/ArticleListPagination";

export function FeedPage() {
  const state = useSelector((state) => state.feedRedux);
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentArticles, setArticles] = useState(state.feedArticles);
  const [selectedTag, changeTag] = useState(null);

  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentMap, setCurrentMap] = useState(state.feedArticleMap);

  const handleChangeIndex = (event, newValue) => {
    setPage(0);
    setTabIndex(newValue);
    if (newValue === 0) {
      if (!state.feedArticleMap[0]) {
        dispatch(getUserFeed({ page: 0 }));
      }
      setPages(
        Array.from({ length: state.totalFeedArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.feedArticleMap);
    } else if (newValue === 1) {
      if (!state.globalArticleMap[0]) {
        dispatch(getGlobalFeed({ page: 0 }));
      }
      setPages(
        Array.from({ length: state.totalGlobalArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.globalArticleMap);
    } else if (newValue === 2) {
      if (!state.tagArticleMap[0]) {
        dispatch(getArticlesWithTag({ tag: selectedTag, page: 0 }));
      }
      setPages(
        Array.from({ length: state.totalTagArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.tagArticleMap);
    }
  };

  useEffect(() => {
    if (!state.tags) {
      dispatch(getTags());
    }
    if (!state.feedArticles) {
      dispatch(getUserFeed({ page: page }));
    }
  }, []);

  useEffect(() => {
    if (tabIndex === 0) {
      setPages(
        Array.from({ length: state.totalFeedArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.feedArticleMap);
    } else if (tabIndex === 1) {
      setPages(
        Array.from({ length: state.totalGlobalArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.globalArticleMap);
    } else if (tabIndex === 2) {
      setPages(
        Array.from({ length: state.totalTagArticle / 10 + 1 }, (_, i) => i)
      );
      setCurrentMap(state.tagArticleMap);
    }
  }, [state.feedArticleMap, state.globalArticleMap, state.tagArticleMap]);

  useEffect(() => {
    if (selectedTag) {
      setTabIndex(2);
      setPage(0);
    }
  }, [selectedTag]);

  const handleClickClip = (value) => {
    changeTag(value);
    dispatch(getArticlesWithTag({ tag: value, page: 0 }));
  };

  const changePage = (newPage) => {
    setPage(newPage);
    if (tabIndex === 0) {
      if (!state.feedArticleMap[newPage]) {
        dispatch(getUserFeed({ page: newPage }));
      } else {
        setCurrentMap(state.feedArticleMap);
      }
    } else if (tabIndex === 1) {
      if (!state.globalArticleMap[newPage]) {
        dispatch(getGlobalFeed({ page: newPage }));
      } else {
        setCurrentMap(state.globalArticleMap);
      }
    } else if (tabIndex === 2) {
      if (!state.tagArticleMap[newPage]) {
        dispatch(getArticlesWithTag({ tag: selectedTag, page: newPage }));
      } else {
        setCurrentMap(state.tagArticleMap);
      }
    }
  };

  return (
    <Container>
      <Grid container pt={5}>
        <Grid item sm={9} px={2}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeIndex}
            TabIndicatorProps={{ style: { backgroundColor: "#5CB85C" } }}
            className={"profile-tabs"}
            textColor={"inherit"}
          >
            <Tab label={"Your Feed"} />
            <Tab label={"Global Feed"} />
            {state.selectedTag ? (
              <Tab label={"#" + state.selectedTag} />
            ) : (
              <div />
            )}
          </Tabs>
          <ArticleListPagination
            isLoading={state.loading}
            map={currentMap}
            page={page}
            pages={pages}
            changePage={(value) => changePage(value)}
          />
        </Grid>
        <Grid item sm={3} className={"feed-tags"}>
          Popular Tags
          <Grid container alignItems={"start"} justifyContent={"start"} py={1}>
            {state.loadingTags || !state.tags ? (
              <CircularProgress />
            ) : (
              state.tags.map((value) => {
                return (
                  <Grid item key={value} px={1} py={0.5}>
                    <Chip
                      className={"feed-tag"}
                      size={"small"}
                      label={value}
                      onClick={() => handleClickClip(value)}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
