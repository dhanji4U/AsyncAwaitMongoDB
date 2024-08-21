import React from 'react'
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import MyProfile from './pages/auth/MyProfile';
import ChangePassword from './pages/auth/ChangePassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import OtpVerification from './pages/auth/OtpVerification';

const App = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                    <Route path="/faq" element={<Faq />} />
                    <Route path="/contactus" element={<ContactUs />} />

                    <Route path="/logout" element={<Logout />} />
                </Route>

                {/* <Route path="*" element={<PageNotFound />} /> */}
                <Route path='/' element={<Login />} />

                <Route path='/login' element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </>
    )
}

export default App
