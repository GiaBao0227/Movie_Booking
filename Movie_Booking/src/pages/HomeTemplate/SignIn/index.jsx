import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin, logout } from "./slice"; // Điều chỉnh đường dẫn nếu cần
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  // Lấy thông tin đăng nhập từ Redux store, giả sử dữ liệu được lưu trong state.signIn.data
  const {
    loading,
    error,
    data: user,
  } = useSelector((state) => state.signInReducer);

  // Khi có user, kiểm tra maLoaiNguoiDung để chuyển hướng tương ứng
  useEffect(() => {
    if (user) {
      if (user.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/dashboard");
      } else if (user.maLoaiNguoiDung === "KhachHang") {
        navigate("/");
      }
    }
  }, [user, navigate]);

  // Xử lý thay đổi input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit form đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actLogin(credentials));
  };

  // Xử lý logout (nếu cần)
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>AuthPage</h1>
      {!user ? (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="taiKhoan"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              onChange={handleOnChange}
              name="taiKhoan"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="matKhau"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              onChange={handleOnChange}
              name="matKhau"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="max-w-sm mx-auto">
          <p>Xin chào, {user.hoTen || user.taiKhoan}!</p>
          <button
            onClick={handleLogout}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout
          </button>
        </div>
      )}
      {loading && <p>Đang xử lý...</p>}
    </div>
  );
};

export default SignInPage;
