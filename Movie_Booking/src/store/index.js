import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import listUsersReducer from "./../pages/AdminTemplate/UsersPage/slice";
import DashboardPageReducer from "../pages/AdminTemplate/DashboardPage/slice";
export const store = configureStore({
    reducer: {
        authReducer,
        listUsersReducer,
        DashboardPageReducer,
    },
});
