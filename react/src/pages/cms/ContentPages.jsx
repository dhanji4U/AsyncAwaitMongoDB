import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Loader from '../../components/loader/Loader';
import { cmsPageDetails } from "../../store/slice/cms_slice";

const ContentPages = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const pageName = `${location.pathname.split('/')[1]}`;
    const isLoading = useSelector((state) => state.cms.isLoading);
    const cmsData = useSelector((state) => state.cms.cmsData?.data);

    // For fetch enquiry list
    const fetchCmsDetails = (request) => dispatch(cmsPageDetails(request));

    // To get first time Listing 
    const pageTitles = {
        "about_us": "About Us",
        "privacy_policy": "Privacy Policy",
        "terms_conditions": "Terms and Conditions",
    };

    const pageTitle = pageTitles[pageName] || "Default Title";

    useEffect(() => {

        const params = {
            user_type: (pageName === 'about_us') ? 'All' : 'Property Owner',
            page_name: pageName
        }

        fetchCmsDetails(params);
    }, [pageName])

    return (
        <>
            {isLoading && <Loader />}

            {/* ================================ Start Page Content ================================== */}
            <div className="content-page">
                <div className="content">

                    {/* <!-- Start Content--> */}
                    <div className="container-fluid">

                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-left">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                                <li className="breadcrumb-item active">{pageTitle}</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">{pageTitle}</h4>
                                        {/* <small className="">Welcome to DD Application</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">

                                <div className="card mb-1">
                                    <div className="card-header new-card-header">
                                        <div dangerouslySetInnerHTML={{ __html: `${cmsData?.data?.content}` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end row--> */}
                    </div>
                    {/* <!-- container --> */}
                </div>
                {/* <!-- content --> */}
            </div>
            {/* ================================ End Page content ============================== */}
        </>
    )
}

export default ContentPages
