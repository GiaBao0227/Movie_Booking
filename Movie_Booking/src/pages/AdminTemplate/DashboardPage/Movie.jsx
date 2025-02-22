import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchListMovie, deleteMovie } from "./slice";
import { useNavigate } from "react-router-dom";
import api from "./../../../services/api";


export default function Movie({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/edit-movie/${movie.maPhim}`, { state: { movie } });
  };

  const handleDeleteClick = () => {
    dispatch(deleteMovie(movie.maPhim));
  };

  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-3">{movie.maPhim}</td>
      <td className="px-4 py-3">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td className="px-4 py-3">{movie.tenPhim}</td>
      <td className="px-4 py-3 max-w-[12rem] truncate">{movie.moTa}</td>
      <td className="px-4 py-3 flex items-center justify-end space-x-2">
        <button className="text-blue-600 hover:underline" onClick={handleEditClick}>
          <svg
            className="w-6 h-6 text-blue-500 dark:text-white"
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
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
        <button className="text-red-600 hover:underline" onClick={handleDeleteClick}>
          <svg
            className="w-6 h-6 text-red-400 dark:text-white"
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
        </button>
      </td>
    </tr>
  );
}
