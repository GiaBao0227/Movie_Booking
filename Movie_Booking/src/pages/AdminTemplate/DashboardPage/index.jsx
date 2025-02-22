import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersPage from "../UsersPage";
import { fetchListMovie, searchMovies } from "./slice";
import Movie from "./Movie";

export default function DashboardPage() {
  const [isFilmDropdownOpen, setIsFilmDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.DashboardPageReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  useEffect(() => {
    console.log("State:", state); // kiểm tra state
  }, [state]);

  const toggleFilmDropdown = () => {
    setIsFilmDropdownOpen(!isFilmDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() === "") {
        dispatch(fetchListMovie());
      } else {
        dispatch(searchMovies(searchQuery));
      }
    }
  };

  const renderListMovie = () => {
    if (!Array.isArray(state.data)) {
      return null;
    }
    return state.data.map((movie) => (
      <Movie key={movie.maPhim} movie={movie} />
    ));
  };

  if (state?.loading) return <p>Loading...</p>;

  const renderActivePage = () => {
    switch (activePage) {
      case "users":
        return <UsersPage onBack={() => setActivePage("dashboard")} />;
      default:
        return (
          <div className="flex-1 p-8">
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mx-auto max-w-screen-xl">
                <div className="relative overflow-hidden">
                  {/* Search & Add Button */}
                  <h1 className="text-3xl font-bold text-gray-800 px-6 py-3 rounded-lg shadow-md inline-block">
                    DashBoard Film
                  </h1>{" "}
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <form className="flex items-center">
                        <label htmlFor="search-input" className="sr-only">
                          Search
                        </label>
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Tìm phim theo tên..."
                            required
                          />
                        </div>
                      </form>
                    </div>

                    {/* Add Movie Button */}
                    <div className="w-full md:w-auto flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => navigate("/admin/add-movie")}
                        className="flex items-center justify-center text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 transition-all duration-300 ease-in-out transform hover:scale-105 font-medium rounded-lg text-sm px-5 py-2 shadow-lg"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          />
                        </svg>
                        Thêm phim
                      </button>
                    </div>
                  </div>
                  {/* Movie Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                        <tr>
                          <th scope="col" className="px-5 py-3">
                            Mã Phim
                          </th>
                          <th scope="col" className="px-5 py-3">
                            Hình Ảnh
                          </th>
                          <th scope="col" className="px-5 py-3">
                            Tên Phim
                          </th>
                          <th scope="col" className="px-5 py-3">
                            Mô tả
                          </th>
                          <th scope="col" className="px-5 py-3">
                            Hành Động
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderListMovie()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-400 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className="w-64 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto py-10 px-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full flex items-center mt-4 p-5 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <svg
              class="w-6 h-6 text-white-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>USER</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 p-6">{renderActivePage()}</div>
    </div>
  );
}
