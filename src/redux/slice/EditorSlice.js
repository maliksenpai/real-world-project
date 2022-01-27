import { createSlice } from "@reduxjs/toolkit";
import {
  clearEditor,
  createArticle,
  updateArticle,
} from "../action/EditorAction";

const initialState = {
  loading: true,
  isSuccess: null,
  article: null,
  isUpdateSuccess: null,
};

export const EditorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    clear: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createArticle.pending, (state, action) => {
      const copyState = { ...state };
      copyState.loading = true;
      copyState.isSuccess = null;
      copyState.article = null;
      return copyState;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.loading = false;
      copyState.isSuccess = true;
      copyState.article = action.payload.response.article;
      return copyState;
    });
    builder.addCase(updateArticle.pending, (state, action) => {
      const copyState = { ...state };
      copyState.isUpdateSuccess = null;
      copyState.isLoading = true;
      return copyState;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      const copyState = { ...state };
      copyState.isUpdateSuccess = true;
      copyState.isLoading = false;
      return copyState;
    });
    builder.addCase(clearEditor, (state) => {
      return { ...initialState, article: "asdasdasdas" };
    });
  },
});
