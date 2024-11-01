import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../appwrrite/postService";
import { useNavigate } from "react-router-dom";

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
      if (createdPost) {
        const getedPosts = await postService.getPosts();
        return getedPosts;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPostsThunk = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const getedPosts = await postService.getPosts();
      return getedPosts;
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
        state.postsArr = action.payload.documents;
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.postsArr = action.payload.documents;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
export const { postÜpdated, getSinglePost, postdeleted } = postSlice.actions;
