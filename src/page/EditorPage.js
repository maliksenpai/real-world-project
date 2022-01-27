import { Box, Button, Container, TextField } from "@mui/material";
import { useValidatableForm } from "react-validatable-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  clearEditor,
  createArticle,
  updateArticle,
} from "../redux/action/EditorAction";
import { useEffect, useState } from "react";
import { EditorSlice } from "../redux/slice/EditorSlice";
import { useStyle } from "../utils/MUIData";
import { getArticleWithSlugData } from "../data/ArticleData";

const rules = [
  {
    path: "title",
    ruleSet: [
      "required",
      { rule: "length", greaterThan: 8, customMessage: "Title is very short" },
    ],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "description",
    ruleSet: [
      "required",
      {
        rule: "length",
        greaterThan: 8,
        customMessage: "Subtitle is very short",
      },
    ],
    dependantPaths: ["comparisonValue"],
  },
  {
    path: "body",
    ruleSet: [
      "required",
      {
        rule: "length",
        greaterThan: 8,
        customMessage: "Description is very short",
      },
    ],
    dependantPaths: ["comparisonValue"],
  },
  { path: "tagList", ruleSet: [] },
];

export function EditorPage() {
  const {
    isValid,
    formData,
    setPathValue,
    setFormIsSubmitted,
    setPathIsBlurred,
    getValue,
    getError,
    setFormData,
  } = useValidatableForm({
    rules,
    hideBeforeSubmit: true,
    showAfterBlur: true,
    focusToErrorAfterSubmit: true,
  });
  const editorState = useSelector((state) => state.editorRedux);
  const actions = EditorSlice.actions;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [isSuccess, setSuccess] = useState(false);
  const classes = useStyle();
  const { slug } = useParams();
  const feedState = useSelector((state) => state.feedRedux);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getArticleWithSlugData({ slug: slug }).then((value) => {
        setFormData({
          title: value.title,
          body: value.body,
          description: value.description,
        });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    return () => {
      dispatch(actions.clear());
    };
  }, []);

  useEffect(() => {
    if (editorState.isSuccess) {
      setSuccess(true);
      navigation("/article/" + editorState.article.slug);
      dispatch(clearEditor());
    }
    if (editorState.isUpdateSuccess) {
      navigation("/article/" + slug);
      dispatch(clearEditor());
    }
  }, [editorState]);

  const handleSubmit = (event) => {
    if (isValid) {
      const article = {
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: formData.tagList,
      };
      if (slug) {
        article.slug = slug;
        dispatch(updateArticle({ article }));
      } else {
        dispatch(createArticle({ article }));
      }
    }
    event.preventDefault();
  };

  return (
    <Container>
      {loading ? (
        <div />
      ) : (
        <Box px={10}>
          <form onSubmit={handleSubmit}>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"Title"}
                error={!!getError("title")}
                helperText={getError("title")}
                type={"text"}
                size={"medium"}
                disabled={editorState.isLoading}
                value={getValue("title") || ""}
                onChange={(e) => setPathValue("title", e.target.value)}
                onBlur={() => setPathIsBlurred("title")}
                id="title"
              />
            </Box>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"What's this article about?"}
                error={!!getError("description")}
                helperText={getError("description")}
                type={"text"}
                size={"small"}
                disabled={editorState.isLoading}
                value={getValue("description") || ""}
                onChange={(e) => setPathValue("description", e.target.value)}
                onBlur={() => setPathIsBlurred("description")}
                id="description"
              />
            </Box>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"Write your article (in markdown)"}
                error={!!getError("body")}
                helperText={getError("body")}
                type={"text"}
                multiline
                rows={6}
                size={"small"}
                disabled={editorState.isLoading}
                value={getValue("body") || ""}
                onChange={(e) => setPathValue("body", e.target.value)}
                onBlur={() => setPathIsBlurred("body")}
                id="body"
              />
            </Box>
            <Box p={1}>
              <TextField
                fullWidth
                placeholder={"Enter Tag Lists"}
                error={!!getError("tagList")}
                helperText={getError("tagList")}
                type={"text"}
                size={"small"}
                disabled={editorState.isLoading}
                value={getValue("tagList") || ""}
                onChange={(e) => setPathValue("tagList", e.target.value)}
                onBlur={() => setPathIsBlurred("tagList")}
                id="tagList"
              />
            </Box>
            <Box textAlign={"end"} p={1}>
              <Button
                classes={{ root: classes.green }}
                type={"submit"}
                className={"signin-login-button"}
                disabled={editorState.isLoading}
                variant={"contained"}
                size={"large"}
                onSubmit={handleSubmit}
              >
                Publish Article
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Container>
  );
}
