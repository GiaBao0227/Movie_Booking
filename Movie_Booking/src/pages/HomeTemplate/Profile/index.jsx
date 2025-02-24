import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./slice";
import Header from "../_Component/Header";
import { useNavigate } from "react-router-dom";
import { logout } from "../SignIn/slice.js";
export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: user,
    loading,
    error,
  } = useSelector((state) => state.profileReducer);
  const [activeTab, setActiveTab] = useState("info"); // "info" hoặc "history"

  // Gọi API lấy thông tin user khi mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p>Đang tải thông tin...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Không có dữ liệu user!</p>;

  // Thông tin lịch sử đặt vé: user.thongTinDatVe (theo API CyberSoft)
  // Mỗi phần tử thongTinDatVe có { maVe, ngayDat, tenPhim, ... , danhSachGhe: [] }
  // Tùy vào API thực tế trả về
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Chuyển hướng về trang đăng nhập sau khi logout
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col md:flex-row bg-white min-h-screen">
        {/* Cột trái: Avatar + Thông tin tóm tắt */}
        <div className="md:w-1/4 border-r p-4 flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150"
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">
            {user.hoTen || user.taiKhoan}
          </h2>
          {/* Thống kê demo hoặc thay bằng user thực tế */}
          <ul className="space-y-1 text-gray-600">
            <li>Bình luận: 0</li>
            <li>Phim đã thích: 0</li>
            <li>Số lần thanh toán: {user.thongTinDatVe?.length || 0}</li>
            <li>Tổng tiền: 0</li>
          </ul>
        </div>

        {/* Cột phải: Tabs (Thông tin tài khoản / Lịch sử đặt vé) */}
        <div className="md:w-3/4 p-4">
          {/* Thanh chuyển tab */}
          <div className="flex space-x-4 border-b pb-2 mb-4">
            <button
              onClick={() => setActiveTab("info")}
              className={`${
                activeTab === "info"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              } pb-2`}
            >
              Thông tin tài khoản
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              } pb-2`}
            >
              Lịch sử đặt vé
            </button>
          </div>

          {/* Nội dung tab */}
          {activeTab === "info" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin</h2>
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-gray-700 mb-1">Tài khoản</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={user.taiKhoan || ""}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full border p-2 rounded"
                    value={user.matKhau || ""}
                    readOnly // Tùy bạn, có thể cho phép cập nhật
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Họ tên</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={user.hoTen || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border p-2 rounded"
                    value={user.email || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={user.soDT || ""}
                  />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Cập nhật
                </button>
              </form>
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Lịch sử đặt vé</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2">STT</th>
                      <th className="px-4 py-2">Tên phim</th>
                      <th className="px-4 py-2">Ngày đặt</th>
                      <th className="px-4 py-2">Thời lượng</th>
                      <th className="px-4 py-2">Ghế</th>
                      <th className="px-4 py-2">Giá vé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.thongTinDatVe?.map((item, index) => (
                      <tr key={item.maVe} className="border-b">
                        <td className="px-4 py-2 text-center">{index + 1}</td>
                        <td className="px-4 py-2">{item.tenPhim}</td>
                        <td className="px-4 py-2">{item.ngayDat}</td>
                        <td className="px-4 py-2">{item.thoiLuongPhim} phút</td>
                        <td className="px-4 py-2">
                          {/* danhSachGhe là mảng, nối tên ghế */}
                          {item.danhSachGhe
                            ?.map((ghe) => ghe.tenGhe)
                            .join(", ")}
                        </td>
                        <td className="px-4 py-2">
                          {item.giaVe.toLocaleString()} đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
