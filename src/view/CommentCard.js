import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Link,
} from "@mui/material";
import { dateOptions } from "../utils/SharePoint";
import "../styles/Articles.scss";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../App";

export function CommentCard({ comment, handleDeleteComment }) {
  const { user } = useContext(UserContext);

  return (
    <Card className={"comment-card"} key={comment.id} elevation={0}>
      <CardContent>{comment.body}</CardContent>
      <CardActions disableSpacing className={"comment-bottom"}>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid item>
            <Grid
              container
              flexDirection={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              columnSpacing={1}
            >
              <Grid item>
                <Link href={comment.author.image}>
                  <Avatar
                    src={comment.author.image}
                    sx={{ height: 24, width: 24 }}
                  />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  underline={"none"}
                  href={comment.author.image}
                  className={"article-author"}
                >
                  {comment.author.username}
                </Link>
              </Grid>
              <Grid item className={"comment-date"}>
                {new Date(comment.createdAt).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
              </Grid>
            </Grid>
          </Grid>
          {!user ? (
            <div />
          ) : comment.author.username === user.username ? (
            <Grid item>
              <IconButton color={"error"} onClick={handleDeleteComment}>
                <Delete />
              </IconButton>
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
