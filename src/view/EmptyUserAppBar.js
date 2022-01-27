import { Button, Grid } from "@mui/material";
import "../styles/AppBar.scss";
import "../styles/StyleUtils.scss";
import { Link } from "react-router-dom";
import { useStyle } from "../utils/MUIData";

export function EmptyUserAppBar() {
  const classes = useStyle();

  return (
    <Grid container>
      <Button
        classes={{ root: classes.root }}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <Link to={"/"} className={"remove-decoration-text appbar-button-text"}>
          Home
        </Link>
      </Button>
      <Button
        classes={{ root: classes.root }}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <Link
          to={"/login"}
          className={"remove-decoration-text appbar-button-text"}
        >
          Sign in
        </Link>
      </Button>
      <Button
        classes={{ root: classes.root }}
        variant={"text"}
        className={"appbar-button remove-padding"}
      >
        <Link
          to={"/register"}
          className={"remove-decoration-text appbar-button-text"}
        >
          Sign up
        </Link>
      </Button>
    </Grid>
  );
}
