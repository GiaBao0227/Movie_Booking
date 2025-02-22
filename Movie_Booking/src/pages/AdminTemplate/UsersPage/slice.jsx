import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchListUsers = createAsyncThunk(
    "listUsersPage/fetchListUsers",
    async (__dirname, { rejectWithValue }) => {
        try {
            const result = await api.get(
                "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP02"
            );

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "listUsersPage/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userId}`);
            return userId;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editUser = createAsyncThunk(
    "listUsersPage/editUser",
    async (userData, { rejectWithValue }) => {
        try {
            const result = await api.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const listUsersPageSlice = createSlice({
    name: "listUsersPageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchListUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.data = state.data.filter(user => user.taiKhoan !== action.payload);
        });
    },
});

export default listUsersPageSlice.reducer;
