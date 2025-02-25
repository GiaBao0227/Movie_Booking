import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../../../services/api";
import moment from "moment";

export default function ShowTime() {
  const { maPhim } = useParams();
  const location = useLocation();
  const tenPhim = location.state?.tenPhim || "";

  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [raps, setRaps] = useState([]);

  const [selectedHeThongRap, setSelectedHeThongRap] = useState("");
  const [selectedCumRap, setSelectedCumRap] = useState("");

  const [showtimeData, setShowtimeData] = useState({
    maPhim: parseInt(maPhim) || 0, // Chuyển maPhim thành số nguyên
    ngayChieuGioChieu: "",
    maRap: 0, // Khởi tạo maRap với giá trị số nguyên
    giaVe: 0,
  });

  // Cập nhật maPhim khi component render
  useEffect(() => {
    setShowtimeData((prev) => ({ ...prev, maPhim: parseInt(maPhim) || 0 }));
  }, [maPhim]);

  // Fetch hệ thống rạp
  useEffect(() => {
    const fetchHeThongRap = async () => {
      try {
        const response = await api.get("/QuanLyRap/LayThongTinHeThongRap");
        setHeThongRap(response.data.content || []);
      } catch (error) {
        console.error("Lỗi lấy hệ thống rạp:", error);
      }
    };
    fetchHeThongRap();
  }, []);

  // Fetch cụm rạp khi chọn hệ thống rạp
  useEffect(() => {
    const fetchCumRap = async () => {
      if (selectedHeThongRap) {
        try {
          const response = await api.get(
            `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${selectedHeThongRap}`
          );
          setCumRap(response.data.content || []);
        } catch (error) {
          console.error("Lỗi lấy cụm rạp:", error);
        }
      } else {
        setCumRap([]);
      }
    };
    fetchCumRap();
  }, [selectedHeThongRap]);

  // Lấy danh sách rạp từ cụm rạp đã chọn
  useEffect(() => {
    if (selectedCumRap) {
      const selectedCum = cumRap.find((cum) => cum.maCumRap === selectedCumRap);
      setRaps(selectedCum?.danhSachRap || []);
    } else {
      setRaps([]);
    }
  }, [selectedCumRap, cumRap]);
  //ep kieu cho maRap
  useEffect(() => {
    setShowtimeData((prev) => ({
      ...prev,
      maRap: Number(prev.maRap) || 0, // Chuyển thành số ngay khi state thay đổi
    }));
  }, [showtimeData.maRap]);

  // Submit tạo lịch chiếu
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Showtime data gửi đi:", showtimeData);

    if (
      !showtimeData.maPhim ||
      !showtimeData.ngayChieuGioChieu ||
      !showtimeData.maRap ||
      !showtimeData.giaVe
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const response = await api.post("/QuanLyDatVe/TaoLichChieu", showtimeData);
      alert("Tạo lịch chiếu thành công!");
      console.log("Showtime created:", response.data);
    } catch (error) {
      console.error("Lỗi khi tạo lịch chiếu:", error.response?.data.content || error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Tạo Lịch Chiếu</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Tên Phim</label>
          <input className="w-full p-2 border rounded" type="text" value={tenPhim} readOnly />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Mã Phim</label>
          <input className="w-full p-2 border rounded" type="text" value={showtimeData.maPhim} readOnly />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Hệ Thống Rạp</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedHeThongRap}
            onChange={(e) => setSelectedHeThongRap(e.target.value)}
          >
            <option value="">Chọn hệ thống rạp</option>
            {heThongRap.map((rap) => (
              <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
                {rap.tenHeThongRap}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cụm Rạp</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCumRap}
            onChange={(e) => setSelectedCumRap(e.target.value)}
          >
            <option value="">Chọn cụm rạp</option>
            {cumRap.map((rap) => (
              <option key={rap.maCumRap} value={rap.maCumRap}>
                {rap.tenCumRap}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mã Rạp</label>
          <select
            className="w-full p-2 border rounded"
            value={showtimeData.maRap}
            onChange={(e) =>
              setShowtimeData((prev) => ({
                ...prev,
                maRap: Number(e.target.value) || 0, // Dùng Number() thay vì parseInt()
              }))
            }
          >
            <option value="">Chọn mã rạp</option>
            {raps.map((rap) => (
              <option key={rap.maRap} value={rap.maRap}>
                {rap.tenRap}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ngày Chiếu Giờ Chiếu</label>
          <input
            className="w-full p-2 border rounded"
            type="datetime-local"
            onChange={(e) => {
              const formattedDate = moment(e.target.value).format("DD/MM/YYYY HH:mm:ss");
              setShowtimeData((prev) => ({ ...prev, ngayChieuGioChieu: formattedDate }));
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Giá Vé</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            onChange={(e) =>
              setShowtimeData((prev) => ({ ...prev, giaVe: parseInt(e.target.value) || 0 }))
            }
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Tạo Lịch Chiếu
        </button>
      </form>
    </div>
  );
}
