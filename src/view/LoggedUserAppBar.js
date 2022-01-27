import { Avatar, Button } from "@mui/material";
import { EditOutlined, SettingsOutlined } from "@mui/icons-material";
import { useStyle } from "../utils/MUIData";
import { useNavigate } from "react-router";

export function LoggedUserAppBar({ user }) {
  const classes = useStyle();
  const navigator = useNavigate();

  return (
    <div>
      <Button
        classes={{ root: classes.transparent }}
        onClick={() => navigator("/")}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        Home
      </Button>
      <Button
        classes={{ root: classes.root }}
        onClick={() => navigator("/editor")}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <EditOutlined fontSize={"small"} />
        New article
      </Button>
      <Button
        classes={{ root: classes.root }}
        onClick={() => navigator("/settings")}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <SettingsOutlined fontSize={"small"} />
        Settings
      </Button>
      <Button
        classes={{ root: classes.root }}
        onClick={() => navigator(`/@${user.username}`)}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <Avatar src={user.image} sx={{ height: 24, width: 24, mr: 1 }} />
        {user.username}
      </Button>
    </div>
  );
}
