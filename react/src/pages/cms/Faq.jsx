import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import Loader from '../../components/loader/Loader';
import { faqList } from "../../store/slice/cms_slice";

const Faq = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.cms.isLoading);
    const faqData = useSelector((state) => state.cms.faqList?.data);

    // For fetch enquiry list
    const fetchFaqList = (request) => dispatch(faqList(request));

    // To get first time Listing 
    useEffect(() => {
        fetchFaqList({});
    }, []);

    if (faqData === undefined) return <> {isLoading && <Loader />} </>

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
                                                <li className="breadcrumb-item active">FAQs</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">FAQs</h4>
                                        {/* <small className="">Welcome to DD Application</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}

                        <div className="row">
                            <div className="col-xl-12">
                                <div className="accordion custom-accordion" id="custom-accordion-one">

                                    {(faqData?.data?.length > 0) ? (
                                        faqData.data.map((item, index) => (
                                            <div key={index} className="card mb-1">
                                                <div className="card-header new-card-header" id={`heading_${index}`}>
                                                    <h5 className="m-0 position-relative">
                                                        <Link to={`#collapse_${index}`} className="custom-accordion-title text-reset d-block" data-bs-toggle="collapse" aria-expanded={index === 0} aria-controls={`collapse_${index}`}>
                                                            Q. {item.question}? <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                                        </Link>
                                                    </h5>
                                                </div>

                                                <div id={`collapse_${index}`} className={`collapse ${index === 0 ? "show" : ""}`} aria-labelledby={`heading_${index}`} data-bs-parent="#custom-accordion-one">
                                                    <div className="card-body">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="card mb-1">
                                            <div className="card-header new-card-header">
                                                <h5 className="m-0 position-relative">
                                                    {faqData?.message ?? 'No FAQs available'}
                                                </h5>
                                            </div>
                                        </div>
                                    )}
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

export default Faq
