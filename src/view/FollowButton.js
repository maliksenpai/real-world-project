import { Add, Favorite, FavoriteOutlined, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";

export function FollowButton({
  classes,
  following,
  username,
  isLoadingFollow,
  handleFollow,
}) {
  return (
    <Button
      classes={{ root: classes.transparent }}
      className={
        following ? "article-follow-button" : "article-unfollow-button"
      }
      variant={following ? "contained" : "outlined"}
      size={"small"}
      disabled={isLoadingFollow}
      onClick={handleFollow}
      startIcon={following ? <Remove /> : <Add />}
    >
      {following ? "Unfollow" : "Follow"} {username}
    </Button>
  );
}
