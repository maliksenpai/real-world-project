import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import {
  deleteCommentData,
  getCommentsWithSlug,
  sendComment,
} from "../data/ArticleData";
import { dateOptions } from "../utils/SharePoint";
import { useNavigate, useParams } from "react-router";
import "../styles/Articles.scss";
import {
  Add,
  Delete,
  Edit,
  Favorite,
  FavoriteOutlined,
  Remove,
} from "@mui/icons-material";
import { CommentCard } from "../view/CommentCard";
import { useStyle } from "../utils/MUIData";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFavoriteArticle,
  changeFollowUser,
  deleteArticle,
  getArticleWithSlug,
} from "../redux/action/FeedAction";
import "../styles/StyleUtils.scss";
import { FollowButton } from "../view/FollowButton";

export function FeedDetailPage() {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  const state = useSelector((state) => state.feedRedux);
  const dispatch = useDispatch();
  const [comments, setComments] = useState(null);
  const [articleLoading, setArticleLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const classes = useStyle();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.selectedArticle) {
      setArticleLoading(true);
      dispatch(getArticleWithSlug({ slug: slug })).then((value) => {
        setArticleLoading(false);
      });
      getCommentsWithSlug({ slug: slug }).then((value) => {
        setComments(value);
        setCommentsLoading(false);
      });
    }
  }, []);

  const handleSubmitComment = (event) => {
    setCommentLoading(true);
    if (comment) {
      sendComment({ comment: comment, slug: slug }).then((value) => {
        const copyComments = [...comments, value];
        setComments(copyComments);
        setComment("");
        setCommentLoading(false);
      });
    }
    event.preventDefault();
  };

  const handleFollow = () => {
    if (user) {
      dispatch(
        changeFollowUser({
          username: state.selectedArticle.author.username,
          following: state.selectedArticle.author.following,
        })
      );
    } else {
      navigate("/register");
    }
  };

  const handleFavorite = () => {
    if (user) {
      dispatch(
        changeFavoriteArticle({
          slug: state.selectedArticle.slug,
          favorited: state.selectedArticle.favorited,
        })
      );
    } else {
      navigate("/register");
    }
  };

  const handleDeleteArticle = () => {
    dispatch(deleteArticle({ slug: slug })).then((value) => {
      navigate("/");
    });
  };

  const handleDeleteComment = ({ slug, commentId }) => {
    deleteCommentData({ slug: slug, commentId: commentId }).then((value) => {
      const copyComments = [...comments];
      const index = copyComments.findIndex(
        (element) => element.id === commentId
      );
      copyComments.splice(index, 1);
      setComments(copyComments);
    });
  };

  return (
    <Box px={0}>
      {articleLoading ? (
        <div />
      ) : (
        <Box>
          <Box className={"feed-detail-title-section"} py={5}>
            <Container>
              <Typography className={"feed-detail-title"}>
                {state.selectedArticle.title}
              </Typography>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"start"}
                alignItems={"center"}
                columnSpacing={1}
              >
                <Grid item>
                  <Link href={"/@" + state.selectedArticle.author.username}>
                    <Avatar
                      src={state.selectedArticle.author.image}
                      sx={{ height: 36, width: 36 }}
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    underline={"none"}
                    href={"/@" + state.selectedArticle.author.username}
                    className={"feed-detail-author"}
                  >
                    {state.selectedArticle.author.username}
                  </Link>
                  <Link
                    underline={"none"}
                    href={"/@" + state.selectedArticle.author.username}
                    className={"article-light"}
                  >
                    {new Date(
                      state.selectedArticle.createdAt
                    ).toLocaleDateString("en-US", dateOptions)}
                  </Link>
                </Grid>
                <Box px={5}>
                  <Grid item>
                    {!user
                      ? differentUserArticle(
                          state.selectedArticle,
                          classes,
                          handleFollow,
                          handleFavorite,
                          state.isLoadingFollow,
                          state.isLoadingFavorite
                        )
                      : state.selectedArticle.author.username === user.username
                      ? sameUserArticle(
                          state.selectedArticle,
                          classes,
                          handleDeleteArticle,
                          state.isLoadingDelete
                        )
                      : differentUserArticle(
                          state.selectedArticle,
                          classes,
                          handleFollow,
                          handleFavorite,
                          state.isLoadingFollow,
                          state.isLoadingFavorite
                        )}
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </Box>
          <Box py={5}>
            <Container>
              <Typography className={"feed-detail-body"}>
                {state.selectedArticle.body}
              </Typography>
              <Box pt={4}>
                {state.selectedArticle.tagList.map((value) => {
                  return (
                    <Box display={"inline"} key={value} px={1}>
                      <Chip
                        className={"article-light"}
                        label={value}
                        size={"small"}
                        variant={"outlined"}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Container>
            <Box>
              <Container>
                <Box px={30}>
                  {commentsLoading ? (
                    <div />
                  ) : (
                    <Box>
                      {user ? (
                        <form onSubmit={handleSubmitComment}>
                          <Card className={"comment-card"}>
                            <CardContent>
                              <TextField
                                fullWidth
                                className={"comment-text"}
                                placeholder={"Write a comment"}
                                type={"text"}
                                variant={"standard"}
                                multiline
                                rows={3}
                                disabled={commentLoading}
                                value={comment}
                                InputProps={{
                                  disableUnderline: true,
                                }}
                                onChange={(event) =>
                                  setComment(event.target.value)
                                }
                              />
                            </CardContent>
                            <CardActions
                              disableSpacing
                              className={"comment-bottom comment-send-bottom"}
                            >
                              <Grid
                                container
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Grid item>
                                  <Avatar
                                    src={user.image}
                                    sx={{ height: 36, width: 36 }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    classes={{ root: classes.green }}
                                    size={"small"}
                                    disabled={commentLoading}
                                    variant={"contained"}
                                    className={"comment-button"}
                                    type={"submit"}
                                    onSubmit={handleSubmitComment}
                                  >
                                    Post Comment
                                  </Button>
                                </Grid>
                              </Grid>
                            </CardActions>
                          </Card>
                        </form>
                      ) : (
                        <div />
                      )}
                      {comments.map((value) => {
                        return (
                          <Box key={value.id} py={2}>
                            {" "}
                            <CommentCard
                              comment={value}
                              handleDeleteComment={() =>
                                handleDeleteComment({
                                  slug: slug,
                                  commentId: value.id,
                                })
                              }
                            />{" "}
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function differentUserArticle(
  article,
  classes,
  handleFollow,
  handleFavorite,
  isLoadingFollow,
  isLoadingFavorite
) {
  return (
    <div>
      <FollowButton
        following={article.author.following}
        username={article.author.username}
        classes={classes}
        handleFollow={handleFollow}
        isLoadingFollow={isLoadingFavorite}
      />
      <Box px={1} display={"inline"} />
      <Button
        classes={{ root: classes.green }}
        className={
          article.favorited
            ? "article-favorited-button"
            : "article-favorite-button"
        }
        variant={article.favorited ? "contained" : "outlined"}
        size={"small"}
        disabled={isLoadingFavorite}
        onClick={handleFavorite}
        startIcon={article.favorited ? <FavoriteOutlined /> : <Favorite />}
      >
        {article.favorited ? "Unfavorite Article" : "Favorite Article"} (
        {article.favoritesCount})
      </Button>
    </div>
  );
}

function sameUserArticle(article, classes, handleDelete, isLoadingDelete) {
  return (
    <div>
      <Link underline={"none"} href={"/editor/" + article.slug}>
        <Button
          className={"article-same-user-button"}
          classes={{ root: classes.transparent }}
          variant={"outlined"}
          size={"small"}
          startIcon={<Edit />}
        >
          Edit Article
        </Button>
      </Link>
      <Box px={1} display={"inline"} />
      <Button
        className={"article-same-user-button"}
        classes={{ root: classes.transparent }}
        variant={"outlined"}
        size={"small"}
        disabled={isLoadingDelete}
        onClick={handleDelete}
        startIcon={<Delete />}
      >
        Delete Article
      </Button>
    </div>
  );
}
