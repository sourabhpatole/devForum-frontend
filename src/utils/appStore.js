import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
export const appStore = configureStore({
  reducer: { user },
});
