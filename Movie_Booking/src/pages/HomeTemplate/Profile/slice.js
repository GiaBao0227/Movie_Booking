import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";
// Điều chỉnh đường dẫn nếu cần, miễn là import đúng file api.js

// Thunk gọi API /QuanLyNguoiDung/ThongTinTaiKhoan (POST hoặc GET tùy backend, ở đây giả sử là POST)
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Nhiều tài liệu cho biết endpoint này thường là POST,
      // nhưng bạn kiểm tra swagger để chắc chắn.
      // Hoặc GET: api.get("/QuanLyNguoiDung/ThongTinTaiKhoan")
      const response = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
      // response.data.content chứa info user
      return response.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Không thể lấy thông tin tài khoản!"
      );
    }
  }
);

const initialState = {
  data: null, // Thông tin user
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Nếu cần reset profile khi logout
    resetProfile: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu thông tin user
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
