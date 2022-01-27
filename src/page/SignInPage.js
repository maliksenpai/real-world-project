import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/StyleUtils.scss";
import { useValidatableForm } from "react-validatable-form";
import { useContext, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../redux/action/SignInAction";
import { useNavigate } from "react-router";
import { UserContext } from "../App";
import { useStyle } from "../utils/MUIData";

const rules = [
  {
    path: "email",
    ruleSet: [
      "required",
      { rule: "email", customMessage: "Invalid email address" },
    ],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "password",
    ruleSet: [
      "required",
      {
        rule: "length",
        greaterThan: 8,
        customMessage: "Password is very short",
      },
    ],
    dependantPaths: ["comparisonValue"],
  },
];

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const state = useSelector((state) => state.signInRedux);
  const { setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const classes = useStyle();

  const {
    isValid,
    formData,
    setPathValue,
    setFormIsSubmitted,
    setPathIsBlurred,
    getValue,
    getError,
  } = useValidatableForm({
    rules,
    hideBeforeSubmit: true,
    showAfterBlur: true,
    focusToErrorAfterSubmit: true,
  });

  const handleFormSubmit = (event) => {
    if (isValid) {
      const email = formData.email;
      const password = formData.password;
      dispatch(signInAction({ email, password }));
    }
    event.preventDefault();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      //navigator("/");
    }
  }, []);

  /*
      getToken() ? <PlatformLayout /> : <Navigate to="/" />,
      import { Navigate, useLocation, useRoutes } from 'react-router-dom';
       */

  useEffect(() => {
    if (state.user !== null) {
      setUser(state.user);
      navigator("/");
    }
  }, [navigator, state]);

  return (
    <Container>
      <Box pt={5} px={40} textAlign={"center"}>
        <Typography className={"signin-title"}>Sign in</Typography>
        <Button classes={{ root: classes.root }} variant={"text"}>
          <Link
            to={"/register"}
            className={"remove-decoration-text green-text signin-register-text"}
          >
            Need an account?
          </Link>
        </Button>
        <Grid flexDirection={"column"} pt={2}>
          <form onSubmit={() => handleFormSubmit()}>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"Email"}
                error={!!getError("email")}
                helperText={getError("email")}
                type={"text"}
                value={getValue("email") || ""}
                onChange={(e) => setPathValue("email", e.target.value)}
                onBlur={() => setPathIsBlurred("email")}
                id="email"
              />
            </Box>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"Password"}
                error={!!getError("password")}
                type={showPassword ? "text" : "password"}
                helperText={getError("password")}
                value={getValue("password") || ""}
                onChange={(e) => setPathValue("password", e.target.value)}
                onBlur={() => setPathIsBlurred("password")}
                id="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        classes={{ root: classes.root }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box textAlign={"end"} p={1}>
              <Button
                classes={{ root: classes.root }}
                type={"submit"}
                className={"signin-login-button"}
                variant={"contained"}
                size={"large"}
                onClick={handleFormSubmit}
                disabled={state.loading}
              >
                Sign in
              </Button>
            </Box>
          </form>
          <Box py={1}>{state.loading ? <CircularProgress /> : <div />}</Box>
          <Box py={1}>
            {state.error !== "" ? (
              <Typography color={"red"}>
                {" "}
                Email or password {state.error["email or password"]}
              </Typography>
            ) : (
              <div />
            )}
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}
