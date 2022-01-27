import { Avatar, Box, Button, Chip, Divider, Grid, Link } from "@mui/material";
import "../styles/Articles.scss";
import { dateOptions } from "../utils/SharePoint";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import { useState } from "react";
import { favoriteArticle, unFavoriteArticle } from "../data/ArticleData";
import { useStyle } from "../utils/MUIData";

export function ArticleCard({ article }) {
  const [copyArticle, setCopyArticle] = useState({ ...article });
  const articleUrl = "/article/" + copyArticle.slug;
  const profileUrl = "/@" + copyArticle.author.username;
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const classes = useStyle();

  const handleFavorite = () => {
    if (!copyArticle.favorited) {
      setFavoriteLoading(true);
      favoriteArticle({ slug: copyArticle.favorited }).then((value) => {
        setCopyArticle({
          ...copyArticle,
          favorited: true,
          favoritesCount: copyArticle.favoritesCount + 1,
        });
        setFavoriteLoading(false);
      });
    } else {
      setFavoriteLoading(true);
      unFavoriteArticle({ slug: copyArticle.favorited }).then((value) => {
        setCopyArticle({
          ...copyArticle,
          favorited: false,
          favoritesCount: copyArticle.favoritesCount - 1,
        });
        setFavoriteLoading(false);
      });
    }
  };

  return (
    <Box p={1}>
      <Grid container flexDirection={"column"}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <Grid
              container
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              columnSpacing={1}
            >
              <Grid item>
                <Link href={profileUrl}>
                  <Avatar
                    src={copyArticle.author.image}
                    sx={{ height: 36, width: 36 }}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  underline={"none"}
                  href={profileUrl}
                  className={"article-author"}
                >
                  {copyArticle.author.username}
                </Link>
                <Link underline={"none"} className={"article-light"}>
                  {new Date(copyArticle.createdAt).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              classes={{ root: classes.green }}
              className={
                copyArticle.favorited
                  ? "article-favorited-button"
                  : "article-favorite-button"
              }
              variant={copyArticle.favorited ? "contained" : "outlined"}
              size={"small"}
              disabled={favoriteLoading}
              onClick={handleFavorite}
              startIcon={
                copyArticle.favorited ? <FavoriteOutlined /> : <Favorite />
              }
            >
              {copyArticle.favoritesCount}
            </Button>
          </Grid>
        </Grid>
        <Grid item py={2}>
          <Link
            className={"article-title article-author"}
            underline={"none"}
            href={articleUrl}
          >
            {copyArticle.title}
          </Link>
          <Link underline={"none"} className={"article-desc"} href={articleUrl}>
            {copyArticle.description}
          </Link>
        </Grid>
        <Grid container justifyContent={"space-between"}>
          <Link
            underline={"none"}
            href={articleUrl}
            className={"article-light"}
          >
            Read more...
          </Link>
          <Box>
            {copyArticle.tagList.map((value) => {
              return (
                <Box display={"inline"} key={value} px={1}>
                  <Chip
                    className={"article-light"}
                    label={value}
                    variant={"outlined"}
                    onClick={() => {}}
                  />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
      <Divider className={"article-divider"} />
    </Box>
  );
}
