import React from 'react'
import { useSelector } from 'react-redux';

import { Link, useLocation } from 'react-router-dom'

const LeftSidebar = () => {
    const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);

    const location = useLocation();

    return (
        <>
            {/* <!-- ========== Left Sidebar Start ========== --> */}
            <div className={`left-side-menu ${isSidebarOpen ? 'd-block' : ''}`}>

                <div className="h-100" data-simplebar>

                    {/* <!--- Sidemenu --> */}

                    <div id="sidebar-menu">

                        <ul id="side-menu">

                            <li className={`${location.pathname.split('/')[1] === 'dashboard' ? "menuitem-active" : ""}`} >
                                <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? "active" : ""}`} >
                                    <i className="mdi mdi-view-dashboard-outline"></i>
                                    <span className='text-uppercase'> Dashboard </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'blog' ? "menuitem-active" : ""}`} >
                                <Link to='/blog' >
                                    <i className="mdi mdi-blogger"></i>
                                    <span> Blog </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'enquiry' ? "menuitem-active" : ""}`} >
                                <Link to="/enquiry" className={`${location.pathname === '/enquiry' ? "active" : ""}`} >
                                    <i className="mdi mdi-timeline-help-outline"></i>
                                    {/* <span className="badge bg-app-theme float-end">2</span> */}
                                    <span className='text-uppercase'> Enquiry </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'properties-report' ? "menuitem-active" : ""}`} >
                                <Link to="/properties-report" className={`${location.pathname === '/properties-report' ? "active" : ""}`} >
                                    <i className="mdi mdi-chart-bar"></i>
                                    <span className='text-uppercase'> Report for Properties </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'contactus' ? "menuitem-active" : ""}`} >
                                <Link to="/contactus" className={`${location.pathname === '/contactus' ? "active" : ""}`} >
                                    <i className="mdi mdi-contacts"></i>
                                    <span className='text-uppercase'> Contact Us </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'faq' ? "menuitem-active" : ""}`} >
                                <Link to="/faq" className={`${location.pathname === '/faq' ? "active" : ""}`} >
                                    <i className="mdi mdi-help-circle-outline"></i>
                                    <span className='text-uppercase'> FAQ </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'about_us' ? "menuitem-active" : ""}`} >
                                <Link to="/about_us" className={`${location.pathname === '/about_us' ? "active" : ""}`} >
                                    <i className="mdi mdi-information"></i>
                                    <span className='text-uppercase'> About Us </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'privacy_policy' ? "menuitem-active" : ""}`} >
                                <Link to="/privacy_policy" className={`${location.pathname === '/privacy_policy' ? "active" : ""}`} >
                                    <i className="mdi mdi-security"></i>
                                    <span className='text-uppercase'> Privacy Policy </span>
                                </Link>
                            </li>

                            <li className={`${location.pathname.split('/')[1] === 'terms_conditions' ? "menuitem-active" : ""}`} >
                                <Link to="/terms_conditions" className={`${location.pathname === '/terms_conditions' ? "active" : ""}`} >
                                    <i className="mdi mdi-briefcase-check-outline"></i>
                                    <span className='text-uppercase'> Terms & Conditions </span>
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <div className="clearfix"></div>

                </div>
                {/* <!-- Sidebar -left --> */}

            </div>
            {/* <!-- Left Sidebar End --> */}
        </>
    )
}

export default LeftSidebar