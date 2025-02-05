import { configureStore } from "@reduxjs/toolkit";
import postReduces from "../features/postSlice";

export const store = configureStore({
  reducer: {
    posts: postReduces,
  },
});
