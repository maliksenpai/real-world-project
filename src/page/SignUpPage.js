import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../App";
import { useNavigate } from "react-router";
import { useValidatableForm } from "react-validatable-form";
import { emailRegex } from "../utils/RegexUtils";
import { signUpAction } from "../redux/action/SignUpActions";
import { useStyle } from "../utils/MUIData";

const rules = [
  {
    path: "email",
    ruleSet: ["required", { rule: "regex", regex: emailRegex }],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "password",
    ruleSet: ["required", { rule: "length", greaterThan: 8 }],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "username",
    ruleSet: ["required", { rule: "length", greaterThan: 8 }],
    dependantPaths: ["comparisonValue"],
  },
];

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const state = useSelector((state) => state.signUpRedux);
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

  const handleFormSubmit = () => {
    if (isValid) {
      const email = formData.email;
      const password = formData.password;
      const username = formData.username;
      dispatch(signUpAction({ email, password, username }));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigator("/");
    }
  }, []);

  useEffect(() => {
    if (state.user !== null) {
      setUser(state.user);
      navigator("/");
    }
  }, [navigator, state]);

  return (
    <Container>
      <Box pt={5} px={40} textAlign={"center"}>
        <Typography className={"signin-title"}>Sign up</Typography>
        <Button classes={{ root: classes.root }} variant={"text"}>
          <Link
            to={"/login"}
            className={"remove-decoration-text green-text signin-register-text"}
          >
            Have an account?
          </Link>
        </Button>
        <Grid flexDirection={"column"} pt={2}>
          <Box p={1}>
            <OutlinedInput
              fullWidth
              placeholder={"Email"}
              error={!!getError("email")}
              type={"text"}
              value={getValue("email") || ""}
              onChange={(e) => setPathValue("email", e.target.value)}
              onBlur={() => setPathIsBlurred("email")}
              id="email"
            />
          </Box>
          <Box p={1}>
            <OutlinedInput
              fullWidth
              placeholder={"Username"}
              error={!!getError("username")}
              type={"text"}
              value={getValue("username") || ""}
              onChange={(e) => setPathValue("username", e.target.value)}
              onBlur={() => setPathIsBlurred("username")}
              id="username"
            />
          </Box>
          <Box p={1}>
            <OutlinedInput
              fullWidth
              placeholder={"Password"}
              error={!!getError("password")}
              type={showPassword ? "text" : "password"}
              value={getValue("password") || ""}
              onChange={(e) => setPathValue("password", e.target.value)}
              onBlur={() => setPathIsBlurred("password")}
              id="password"
              endAdornment={
                <InputAdornment position={"end"}>
                  <IconButton
                    classes={{ root: classes.root }}
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box textAlign={"end"} p={1}>
            <Button
              classes={{ root: classes.root }}
              className={"signin-login-button"}
              variant={"contained"}
              size={"large"}
              onClick={handleFormSubmit}
              disabled={state.loading}
            >
              Sign in
            </Button>
          </Box>
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
