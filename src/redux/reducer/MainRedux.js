import { combineReducers } from "redux";
import { SignInSlice } from "../slice/SignInSlice";
import { SignUpSlice } from "../slice/SignUpSlice";
import { SettingsSlice } from "../slice/SettingsSlice";
import { ProfileSlice } from "../slice/ProfileSlice";
import { FeedSlice } from "../slice/FeedSlice";
import { EditorSlice } from "../slice/EditorSlice";

export const MainRedux = combineReducers({
  signInRedux: SignInSlice.reducer,
  signUpRedux: SignUpSlice.reducer,
  settingsRedux: SettingsSlice.reducer,
  profileRedux: ProfileSlice.reducer,
  feedRedux: FeedSlice.reducer,
  editorRedux: EditorSlice.reducer,
  editorActions: EditorSlice,
});
