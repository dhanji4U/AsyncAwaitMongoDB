import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

import Footer from '../components/footer/Footer.jsx';
import Header from '../components/header/Header.jsx';
import LeftSidebar from '../components/sidebar/Sidebar.jsx';

function PrivateRoute() {

    const isAuthenticated = localStorage.getItem("OwnerToken");

    return isAuthenticated ?
        <>
            <div id="wrapper">
                <Header />
                <LeftSidebar />
                <Outlet />
                <Footer />
            </div>
        </> :
        <Navigate to='/login' />
}

export default PrivateRoute