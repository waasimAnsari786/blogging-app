import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../appwrrite/postService";

const initialState = {
  postsArr: [],
  loading: false,
  error: null,
};

export const createPostThunk = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const createdPost = await postService.createPost(postData);
      return createdPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postÜpdated: () => {},
    getSinglePost: () => {},
    postdeleted: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.postsArr.shift(action.payload);
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
export const { postCreated, postÜpdated, getSinglePost, postdeleted } =
  postSlice.actions;
