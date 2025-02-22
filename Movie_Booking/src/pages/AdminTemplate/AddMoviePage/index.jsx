import React, { useState,useEffect } from "react";
import api from "../../../services/api";
import { useLocation } from "react-router-dom";

export default function AddMoviePage() {
  const location = useLocation();
  const movie = location.state?.movie;

  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: true,
    dangChieu: true,
    hot: true,
    danhGia: 0,
    hinhAnh: null,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        tenPhim: movie.tenPhim,
        trailer: movie.trailer,
        moTa: movie.moTa,
        ngayKhoiChieu: movie.ngayKhoiChieu,
        sapChieu: movie.sapChieu,
        dangChieu: movie.dangChieu,
        hot: movie.hot,
        danhGia: movie.danhGia,
        hinhAnh: movie.hinhAnh,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      hinhAnh: e.target.files[0],
    });
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("tenPhim", formData.tenPhim);
    data.append("trailer", formData.trailer);
    data.append("moTa", formData.moTa);
    data.append("ngayKhoiChieu", formatDate(formData.ngayKhoiChieu));
    data.append("sapChieu", formData.sapChieu);
    data.append("dangChieu", formData.dangChieu);
    data.append("hot", formData.hot);
    data.append("danhGia", formData.danhGia);
    data.append("hinhAnh", formData.hinhAnh);

    try {

        await api.post("/QuanLyPhim/ThemPhimUploadHinh", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Thêm phim thành công!");
      
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Thêm phim thất bại!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm mới phim</h2>
      {/* <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Thêm phim
      </button> */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên phim
            </label>
            <input
              type="text"
              name="tenPhim"
              value={formData.tenPhim}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Trailer
            </label>
            <input
              type="text"
              name="trailer"
              value={formData.trailer}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mô tả
            </label>
            <textarea
              name="moTa"
              value={formData.moTa}
              onChange={handleChange}
              rows="4"
              className="border p-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ngày khởi chiếu
            </label>
            <input
              type="date"
              name="ngayKhoiChieu"
              value={formData.ngayKhoiChieu}
              onChange={handleChange}
              className="border p-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Số sao
            </label>
            <input
              type="number"
              name="danhGia"
              value={formData.danhGia}
              onChange={handleChange}
              min="1"
              max="10"
              className="border p-2 w-20 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
              Đang chiếu
            </label>
            <input
              type="checkbox"
              name="dangChieu"
              checked={formData.dangChieu}
              onChange={handleChange}
              className="peer hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative cursor-pointer"></div>
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
              Sắp chiếu
            </label>
            <input
              type="checkbox"
              name="sapChieu"
              checked={formData.sapChieu}
              onChange={handleChange}
              className="peer hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative cursor-pointer"></div>
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
              Hot
            </label>
            <input
              type="checkbox"
              name="hot"
              checked={formData.hot}
              onChange={handleChange}
              className="peer hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative cursor-pointer"></div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Hình ảnh
          </label>
          <input
            type="file"
            name="hinhAnh"
            onChange={handleFileChange}
            className="border p-2 w-full rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">{movie ? "Cập nhật phim" : "Thêm phim"}</button>
      </form>
    </div>
  );
}
