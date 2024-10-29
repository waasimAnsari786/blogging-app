import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postCreated: (state, action) => {},
    postÜpdated: () => {},
    getSinglePost: () => {},
    postdeleted: () => {},
  },
});

export default postSlice.reducer;
export const { postCreated, postÜpdated, getSinglePost, postdeleted } =
  postSlice.actions;
