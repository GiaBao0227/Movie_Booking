// Desc: Config routes

import PageNotFound from "./../pages/PageNotFound";
//AdminTemplate
import AdminTemplate from "../pages/AdminTemplate";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import { Route } from "react-router-dom";
import UsersPage from "../pages/AdminTemplate/UsersPage";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import EditMoviePage from "../pages/AdminTemplate/EditMoviePage";
import EditUserPage from "../pages/AdminTemplate/EditUserPage";
import ShowTimePage from "../pages/AdminTemplate/ShowTimePage";
//HomeTemplate
// import DetailMoviePage from "../pages/HomeTemplate/DetailMovie";
// // import PageNotFound from "../pages/PageNotFound";
// import ShowtimesMoviesPage from "../pages/HomeTemplate/ShowtimesMovies";
// import BookingPage from "../pages/HomeTemplate/Booking";
// import SignIn from "../pages/HomeTemplate/SignIn";
// import Profile from "../pages/HomeTemplate/Profile";
// import Register from "../pages/HomeTemplate/Register";
// import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
// import HomeTemplate from "../pages/HomeTemplate";

const routes = [
//   {
//     path: "",
//     element: HomeTemplate,
//     children: [
//       {
//         path: "",
//         element: ListMoviePage,
//       },
//       {
//         path: "list-movie",
//         element: ListMoviePage,
//       },
//       {
//         path: "theater-chain",
//         element: ShowtimesMoviesPage,
//       },
//       {
//         path: "booking/:id",
//         element: BookingPage,
//       },
//       {
//         path: "detail/:id",
//         element: DetailMoviePage,
//       },
//     ],
//   },

  {
    path: "admin",
    element: AdminTemplate,
    chilren: [
      {
        path: "dashboard",
        element: DashboardPage,
      },
      {
        path: "add-user",
        element: AddUserPage,
      },
      {
        path: "users",
        element: UsersPage,
      },
      {
        path: "add-movie",
        element: AddMoviePage,
      },
      {
        path: "edit-movie/:id",
        element: EditMoviePage,
      },
      {
        path: "edit-user/:id",
        element: EditUserPage,
      },
      {
        path: "dashboard/showtime/:maPhim",
        element: ShowTimePage,
      },
    ],
  },

  {
    path: "auth",
    element: AuthPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
//   {
//     path: "signin",
//     element: SignIn,
//   },
//   {
//     path: "profile",
//     element: Profile,
//   },
//   {
//     path: "register",
//     element: Register,
//   },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.chilren) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.chilren.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
