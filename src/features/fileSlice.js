import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fileService from "../appwrrite/fileService";

const initialState = {
  preview_URL: "",
  loading: true,
  error: null,
};

const fileUploadThunk = createAsyncThunk(
  "file/fileUpload",
  async (file, { rejectWithValue }) => {
    try {
      const uploadedFile = await fileService.uploadFile(file);
      return uploadedFile;
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  }
);

const deleteUploadThunk = createAsyncThunk(
  "file/fileDelete",
  async (fileId, { rejectWithValue }) => {
    try {
      await fileService.deleteImage(fileId);
      return "";
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  }
);

const getImagePreviewThunk = createAsyncThunk(
  "file/getImagePreview",
  (fileId, { rejectWithValue }) => {
    try {
      const imagePreview = fileService.getPreviewFile(fileId);
      return imagePreview;
    } catch (error) {
      return rejectWithValue(error.messsage);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fileUploadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fileUploadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.preview_URL = action.payload;
      })
      .addCase(fileUploadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUploadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUploadThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.preview_URL = action.payload;
      })
      .addCase(deleteUploadThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getImagePreviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImagePreviewThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.preview_URL = action.payload;
      })
      .addCase(getImagePreviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fileSlice.reducer;
export { fileUploadThunk, deleteUploadThunk, getImagePreviewThunk };
