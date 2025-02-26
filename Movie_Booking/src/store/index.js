import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import listUsersReducer from "./../pages/AdminTemplate/UsersPage/slice";
import DashboardPageReducer from "../pages/AdminTemplate/DashboardPage/slice";

// import listMoviePageReducer from "./../pages/HomeTemplate/ListMoviePage/slice";
// import detailMovieReducer from "./../pages/HomeTemplate/DetailMovie/slice";
// // import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
// import bannerReducer from "./../pages/HomeTemplate/Banner/slice";
// import bookingReducer from "./../pages/HomeTemplate/Booking/slice";
// import showtimesReducer from "./../pages/HomeTemplate/ShowtimesMovies/slice";
// import signInReducer from "./../pages/HomeTemplate/SignIn/slice";
// import profileReducer from "./../pages/HomeTemplate/Profile/slice";
// import registerReducer from "./../pages/HomeTemplate/Register/slice";

export const store = configureStore({
    reducer: {
        authReducer,
        listUsersReducer,
        DashboardPageReducer,
        // listMoviePageReducer,

    // detailMovieReducer,
    // bannerReducer,
    // showtimesReducer,
    // bookingReducer,
    // signInReducer,
    // profileReducer,
    // registerReducer,
    },
});
