import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

import GLOBALS from '../../utils/Constant';

import { dashboardDetails } from "../../store/slice/dashboard_slice";
import { useDispatch, useSelector } from "react-redux";
import { CountUp } from 'use-count-up'

const Dashboard = () => {

    const dispatch = useDispatch();
    const dashboardCount = useSelector((state) => state.dashboard.dashboardData?.data?.data);

    const [dates, setDatesState] = useState({
        startDate: "",
        endDate: ""
    });

    const setDates = (e, { startDate, endDate }) => {
        setDatesState({
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD")
        });
    };

    // For fetch dashboard count
    const fetchDashboardCount = (request) => dispatch(dashboardDetails(request));

    // Get first time counts 
    useEffect(() => {

        fetchDashboardCount({});
    }, []);

    //UserEffect For Filter
    useEffect(() => {

        let filterParams = {
            start_date: dates.startDate,
            end_date: dates.endDate,
        }

        fetchDashboardCount(filterParams);

    }, [dates]);

    function clearFilter() {

        // Common.processing();
        setTimeout(() => {
            setDatesState({
                startDate: "",
                endDate: ""
            });
        }, 1000)
    }

    return (
        <>
            {/* ================================ Start Page Content ================================== */}
            <div className="content-page">
                <div className="content">

                    {/* <!-- Start Content--> */}
                    <div className="container-fluid">

                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    {/* <div className="page-title-right">
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="input-group input-group-sm">

                                                <DateRangePicker
                                                    onApply={setDates}
                                                    initialSettings={{ startDate: moment().subtract(6, "days").format('MM/DD/YYYY'), endDate: moment().format('MM/DD/YYYY'), ranges: GLOBALS.DATE_PICKER_RANGES }} >
                                                    <input
                                                        type="text"
                                                        value={dates.startDate !== '' ? moment(dates.startDate).format('MMMM DD, YYYY') + " - " + moment(dates.endDate).format('MMMM DD, YYYY') : 'Select Period'}
                                                        className="form-control w-15vw"
                                                        onChange={() => { console.log(`changes`); }}
                                                    />
                                                </DateRangePicker>

                                                <span className="input-group-text bg-app border-app text-white">
                                                    <i className="mdi mdi-calendar-range"></i>
                                                </span>

                                            </div>
                                            <button onClick={() => clearFilter()} className="btn btn-app btn-sm ms-2">
                                                <i className="mdi mdi-autorenew"></i>
                                            </button>
                                        </div>
                                    </div> */}
                                    <div className="page-title-left">

                                        <h4 className="page-title d-flex">Dashboard</h4>
                                        {/* <small className="">Welcome to {GLOBALS.APP_NAME} Application</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}

                        <div className="row">

                            <div className="col-md-6 col-xl-3">

                                <Link to="/enquiry">
                                    <div className="widget-rounded-circle card new-cards zoomInRight animated">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-success border-success border">
                                                        <i className="fe-user font-22 avatar-title text-success"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-end">
                                                        <h3 className="text-dark">
                                                            <span>
                                                                <CountUp isCounting end={dashboardCount?.enquiry_count ?? 0} duration={8} />
                                                            </span>
                                                        </h3>
                                                        <p className="text-muted mb-1 text-truncate">Total Enquiry</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end row--> */}
                                        </div>
                                    </div>
                                    {/* <!-- end widget-rounded-circle--> */}
                                </Link>
                            </div>
                            {/* <!-- end col--> */}

                            <div className="col-md-6 col-xl-3">
                                <Link to="/blog">
                                    <div className="widget-rounded-circle card new-cards zoomInRight animated">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="avatar-lg rounded-circle bg-soft-success border-success border">
                                                        <i className="fe-flag font-22 avatar-title text-success"></i>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="text-end">
                                                        <h3 className="text-dark mt-1">
                                                            <span>
                                                                <CountUp isCounting end={dashboardCount?.blog_count ?? 0} duration={8} />
                                                            </span>
                                                        </h3>
                                                        <p className="text-muted mb-1 text-truncate">Total blog</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end row--> */}
                                        </div>
                                    </div>
                                    {/* <!-- end widget-rounded-circle--> */}
                                </Link>
                            </div>
                            {/* <!-- end col--> */}

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


export default Dashboard