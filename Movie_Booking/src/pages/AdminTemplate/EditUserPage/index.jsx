import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editUser, fetchListUsers } from "../UsersPage/slice";

export default function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, loading } = useSelector((state) => state.listUsersReducer);
  
  const [userData, setUserData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchListUsers());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data) {
      const user = data.find((user) => user.taiKhoan === id);
      if (user) {
        setUserData((prev) => ({ ...prev, ...user }));
      }
    }
  }, [data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editUser(userData)).unwrap();
      alert("Cập nhật thành công!");
      navigate("/admin/users");
    } catch (err) {
      alert("Cập nhật thất bại: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-700 text-center">Đang tải...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      {error && <p className="text-red-500">{error.message || "Có lỗi xảy ra!"}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tài khoản</label>
          <input type="text" name="taiKhoan" value={userData.taiKhoan} disabled className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu</label>
          <input type="password" name="matKhau" value={userData.matKhau} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
          <input type="text" name="soDt" value={userData.soDt} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Loại người dùng</label>
          <input type="text" name="maLoaiNguoiDung" value={userData.maLoaiNguoiDung} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Họ tên</label>
          <input type="text" name="hoTen" value={userData.hoTen} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Lưu
        </button>
      </form>
    </div>
  );
}
