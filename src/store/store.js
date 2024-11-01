import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../features/authSlice";
import postSliceReducers from "../features/postSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    post: postSliceReducers,
  },
});

export default store;
