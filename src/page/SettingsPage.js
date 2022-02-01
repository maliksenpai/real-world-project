import { Box, Button, TextField, Typography } from "@mui/material";
import "../styles/Auth.scss";
import { useValidatableForm } from "react-validatable-form";
import { useContext } from "react";
import { UserContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { settingsAction } from "../redux/action/SettingsAction";
import { useStyle } from "../utils/MUIData";
import { useNavigate } from "react-router";

const rules = [
  {
    path: "email",
    ruleSet: [
      "required",
      { rule: "email", customMessage: "Invalid email address" },
    ],
    dependantPaths: ["comparisonValue"],
  },
  { path: "password", ruleSet: [] },
  {
    path: "username",
    ruleSet: [
      "required",
      {
        rule: "length",
        greaterThan: 8,
        customMessage: "Username is very short",
      },
    ],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "imageUrl",
    ruleSet: ["required", { rule: "url" }],
    dependantPaths: ["comparisonValue"],
  },
  { path: "bio", ruleSet: [] },
];

export function SettingsPage() {
  const { user, setUser } = useContext(UserContext);
  const state = useSelector((state) => state.settingsRedux);
  const dispatch = useDispatch();
  const classes = useStyle();
  const navigate = useNavigate();

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
    initialFormData: {
      imageUrl: user.image,
      email: user.email,
      username: user.username,
      bio: user.bio,
    },
  });

  const handleSubmitForm = (event) => {
    if (isValid) {
      const image = formData.imageUrl;
      const username = formData.username;
      const bio = formData.bio;
      const email = formData.email;
      const password = formData.password ? formData.password : "";
      dispatch(
        settingsAction({
          image,
          username,
          bio,
          email,
          password,
        })
      );
    }
    event.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <Box pt={5} px={40} textAlign={"center"}>
      <Typography className={"signin-title"}>Your Settings</Typography>
      <form onSubmit={handleSubmitForm}>
        <Box p={1}>
          <TextField
            fullWidth
            placeholder={"Image URL"}
            error={!!getError("imageUrl")}
            helperText={getError("imageUrl")}
            type={"text"}
            value={getValue("imageUrl") || ""}
            onChange={(e) => setPathValue("imageUrl", e.target.value)}
            onBlur={() => setPathIsBlurred("imageUrl")}
            id="imageUrl"
          />
        </Box>
        <Box p={1}>
          <TextField
            fullWidth
            placeholder={"Username"}
            error={!!getError("username")}
            helperText={getError("username")}
            type={"text"}
            value={getValue("username") || ""}
            onChange={(e) => setPathValue("username", e.target.value)}
            onBlur={() => setPathIsBlurred("username")}
            id="username"
          />
        </Box>
        <Box p={1}>
          <TextField
            fullWidth
            placeholder={"Short bio about you"}
            error={!!getError("bio")}
            helperText={getError("bio")}
            type={"text"}
            multiline
            rows={6}
            value={getValue("bio") || ""}
            onChange={(e) => setPathValue("bio", e.target.value)}
            onBlur={() => setPathIsBlurred("bio")}
            id="bio"
          />
        </Box>
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
            placeholder={"New Password"}
            error={!!getError("password")}
            helperText={getError("password")}
            type={"text"}
            value={getValue("password") || ""}
            onChange={(e) => setPathValue("password", e.target.value)}
            onBlur={() => setPathIsBlurred("password")}
            id="password"
          />
        </Box>
        <Box textAlign={"end"} p={1}>
          <Button
            classes={{ root: classes.green }}
            type={"submit"}
            className={"signin-login-button"}
            variant={"contained"}
            size={"large"}
            onSubmit={handleSubmitForm}
          >
            Save Settings
          </Button>
          <Box textAlign={"start"} p={1}>
            <Button
              variant={"outlined"}
              color={"error"}
              size={"large"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
