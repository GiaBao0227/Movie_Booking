import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchListUsers, deleteUser } from "./slice";

export default function UsersPage({ }) {
  const state = useSelector((state) => state.listUsersReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleAddUser = () => {
    navigate("/admin/add-user"); // Navigate to AddUserPage
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const renderListUsers = () => {
    console.log("state listUser", state);
    const { data } = state;

    return data?.map((user) => {
      return (
        <tr key={user.taiKhoan}>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">{user.taiKhoan}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">{user.hoTen}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">{user.email}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap">{user.soDT}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <span
              className={
                user.maLoaiNguoiDung === "KhachHang"
                  ? "rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900"
                  : "rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900"
              }
            >
              {user.maLoaiNguoiDung}
            </span>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm flex gap-2">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => handleEditUser(user.taiKhoan)}
            >
              <svg
                className="w-6 h-6 text-blue-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
              onClick={() => handleDeleteUser(user.taiKhoan)}
            >
              <svg
                className="w-6 h-6 text-red-600 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-xs text-gray-500">
            View accounts of registered users
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="ml-10 space-x-8 lg:ml-40">
            <button
              onClick={handleAddUser} // Add onClick event
              className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700"
            >
              + Add User
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="mb-4 flex items-center gap-2 rounded-md  px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-200"
      >
        <svg
          className="w-6 h-6 text-blue-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-400 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">Tài khoản</th>
                <th className="px-5 py-3">Họ tên</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">SĐT</th>
                <th className="px-5 py-3">Loại người dùng</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">{renderListUsers()}</tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            {" "}
            Showing 1 to 5 of 12 Entries{" "}
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Prev
            </button>
            <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
