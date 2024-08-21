import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/auth_slice";

import sidebarSlice from "./slice/sidebar_slice";


const store = configureStore({
    reducer: {

        auth: authSlice,


        sidebar: sidebarSlice,

    },
});
export default store;
