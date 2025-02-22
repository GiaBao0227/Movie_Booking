// import HomeTemplate from "../pages/HomeTemplate"; 
// import HomePage from "../pages/HomeTemplate/HomePage";
// import AboutPage from "../pages/HomeTemplate/AboutPage";
// import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
// import NewsPage from "../pages/HomeTemplate/NewsPage";
// import ShoppingPhonePage from "../pages/HomeTemplate/ShoppingPhonePage";
// import HooksPage from "./../pages/HomeTemplate/HooksPage";
// import DetailMoviePage from "./../pages/HomeTemplate/DetailMoviePage";
import PageNotFound from "./../pages/PageNotFound";

import AdminTemplate from "../pages/AdminTemplate";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import { Route } from "react-router-dom";
import UsersPage from "../pages/AdminTemplate/UsersPage";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import EditMoviePage from "../pages/AdminTemplate/EditMoviePage";
import EditUserPage from "../pages/AdminTemplate/EditUserPage";

const routes = [
    // {
    //     path: "",
    //     element: HomeTemplate,
    //     chilren: [
    //         {
    //             path: "",
    //             element: HomePage,
    //         },
    //         {
    //             path: "about",
    //             element: AboutPage,
    //         },
    //         {
    //             path: "list-movie",
    //             element: ListMoviePage,
    //         },
    //         {
    //             path: "news",
    //             element: NewsPage,
    //         },
    //         {
    //             path: "shopping-phone",
    //             element: ShoppingPhonePage,
    //         },
    //         {
    //             path: "hooks",
    //             element: HooksPage,
    //         },
    //         {
    //             path: "detail/:id",
    //             element: DetailMoviePage,
    //         },
    //     ],
    // },
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
];

export const renderRoutes = () => {
    return routes.map((route) => {
        if (route.chilren) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                >
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
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            );
        }
    });
};
