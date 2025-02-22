import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchListMovie = createAsyncThunk(
  "dashboardPage/fetchListMovie",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
        console.log("API data result: ", result);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchMovies = createAsyncThunk('dashboard/searchMovies', async (tenPhim) => {
  const response = await api.get('/QuanLyPhim/LayDanhSachPhim', {
    params: { tenPhim, maNhom: 'GP01' },
  });
  console.log("API data response: ", response.data.content);
  
  return Array.isArray(response.data.content) ? response.data.content : [];
});

export const deleteMovie = createAsyncThunk(
  'dashboard/deleteMovie',
  async (maPhim, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      dispatch(fetchListMovie()); // Cập nhật lại danh sách phim sau khi xóa thành công
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const dashboardPageSlice = createSlice({
  name: "dashboardPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(searchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(searchMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMovie.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default dashboardPageSlice.reducer;
