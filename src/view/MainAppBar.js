import "../styles/StyleUtils.scss";
import "../styles/AppBar.scss";
import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../App";
import { EmptyUserAppBar } from "./EmptyUserAppBar";
import { LoggedUserAppBar } from "./LoggedUserAppBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export function MainAppBar() {
  const { user } = useContext(UserContext);
  const navigator = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={"appbar-background"} elevation={0}>
        <Toolbar>
          <Container>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Link to={"/"} className={"remove-decoration-text"}>
                  <Typography className={"appbar-text"} sx={{ flexGrow: 1 }}>
                    Conduit
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                {user ? <LoggedUserAppBar user={user} /> : <EmptyUserAppBar />}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
