import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import GLOBALS from '../../utils/Constant';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from '../../store/slice/sidebar_slice';
import { ErrorAlert } from '../../common/Common';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ReactDetails = useSelector((state) => state.auth.ReactDetails.data?.data || null);

    const ReactName = ReactDetails?.name ?? localStorage.getItem('OwnerName');

    // Check the length of the admin name and truncate if needed
    const truncatedReactName = ReactName && ReactName.length > 13
        ? `${ReactName.slice(0, 13)}...`
        : ReactName;

    const handleToggleMenu = () => {
        dispatch(toggleSidebar());
    };

    useEffect(() => {
        window.addEventListener('unauthorizedEvent', () => {
            navigate('/');
            ErrorAlert("Another user has logged in with these credentials");
        });
    }, [navigate]);

    return (
        <>
            {/* <!-- Topbar Start --> */}
            <div className="navbar-custom">
                <div className="container-fluid">

                    {/* <!-- User box --> */}
                    <ul className="list-unstyled topnav-menu float-end mb-0">

                        <li className="dropdown notification-list topbar-dropdown">

                            <Link className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <img src={process.env.PUBLIC_URL + "/assets/images/users/user-1.jpg"} alt="LoginProfile" className="rounded-circle" />
                                <span className="pro-user-name ms-1">
                                    {truncatedReactName} <i className="mdi mdi-chevron-down"></i>
                                </span>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                                {/* <!-- item--> */}
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome !</h6>
                                </div>

                                {/* <!-- item--> */}
                                <Link to="/my-profile" className="dropdown-item notify-item">
                                    <i className="fe-user"></i>
                                    <span>My Account</span>
                                </Link>

                                {/* <!-- item--> */}
                                <Link to="/change-password" className="dropdown-item notify-item">
                                    <i className="mdi mdi-security"></i>
                                    <span>Change Password</span>
                                </Link>

                                <div className="dropdown-divider"></div>

                                {/* <!-- item--> */}
                                <Link to="/logout" className="dropdown-item notify-item">
                                    <i className="fe-log-out"></i>
                                    <span>Logout</span>
                                </Link>

                            </div>
                        </li>
                    </ul>

                    {/* <!-- LOGO --> */}
                    <div className="logo-box">
                        <Link to="/dashboard" className="logo logo-light text-center">
                            <span className="logo-sm">
                                <img className='img-logo-sm' src={process.env.PUBLIC_URL + '/assets/images/sm-logo.png'} alt="" height="22" />
                                <span className="logo-lg-text-light"></span>

                            </span>
                            <span className="logo-lg">
                                <img className='img-logo-lg' src={process.env.PUBLIC_URL + GLOBALS.LOGO} alt="" height="20" />
                                <span className="logo-lg-text-light"></span>
                            </span>
                        </Link>
                    </div>

                    <div className="topnav-container">
                        <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                            <li>
                                <button className="button-menu-mobile waves-effect waves-light" onClick={handleToggleMenu}>
                                    <i className="fe-menu"></i>
                                </button>
                            </li>

                            <li>
                                <Link className="navbar-toggle nav-link" onClick={handleToggleMenu}>

                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>

                            </li>
                        </ul>
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
            {/* <!-- End Topbar --> */}
        </>
    )

}
export default Topbar