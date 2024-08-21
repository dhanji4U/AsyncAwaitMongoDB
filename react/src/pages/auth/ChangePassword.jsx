import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as Common from '../../common/Common';

import * as authRedux from "../../store/slice/auth_slice";
import { useDispatch } from "react-redux";

export default function ChangePassword() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        old_password: Yup.string()
            .required('Please enter old password'),
        new_password: Yup.string()
            .notOneOf([Yup.ref('old_password'), null], 'Your new password can not be same as your old password')
            .required('Please enter new password'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Your confirm password should be the same as your new password')
            .required('Please enter confirm password')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {

        try {

            const params = {
                old_password: data.old_password,
                new_password: data.new_password,
                confirm_password: data.confirm_password,
            }

            // For change password
            dispatch(
                authRedux.updatePassword(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    Common.SuccessAlert(response.message)
                    navigate("/dashboard");
                } else {
                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');

                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in change password:', error);
        }
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
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                            <li className="breadcrumb-item active">Edit Password</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Change Password</h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title -->  */}

                        <div className="row">
                            <div className="col-12">
                                <div className="card">

                                    {/* Back Button */}
                                    <button className="button" onClick={() => navigate(-1)}>
                                        <div className="button-box">
                                            <span className="button-elem">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                                                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                                                </svg>
                                            </span>
                                            <span className="button-elem">
                                                <svg viewBox="0 0 46 40">
                                                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </button>

                                    <div className="card-body">

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="row">

                                                {/* Old Password */}
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="old_password" className="form-label">Old Password</label>
                                                    <div className="input-group input-group-merge">
                                                        <input type={showOldPassword ? 'text' : 'password'} id="old_password" className="form-control" placeholder="Enter old password" {...register('old_password')} />

                                                        <button type="button" className={`input-group-text ${showOldPassword ? 'show-password' : ''}`} aria-pressed={showOldPassword}
                                                            onClick={() => setShowOldPassword(!showOldPassword)}>
                                                            <span className="password-eye"></span>
                                                        </button>

                                                    </div>
                                                    <span className="validation_error">{errors.old_password?.message}</span>
                                                </div>

                                                {/* New Password */}
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="new_password" className="form-label">New Password</label>
                                                    <div className="input-group input-group-merge">
                                                        <input type={showNewPassword ? 'text' : 'password'} id="new_password" className="form-control" placeholder="Enter new password" {...register('new_password')} />
                                                        <button type="button" className={`input-group-text ${showNewPassword ? 'show-password' : ''}`} aria-pressed={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)}>
                                                            <span className="password-eye"></span>
                                                        </button>

                                                    </div>
                                                    <span className="validation_error">{errors.new_password?.message}</span>
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                                    <div className="input-group input-group-merge">
                                                        <input type={showConfirmPassword ? 'text' : 'password'} id="confirm_password" className="form-control" placeholder="Confirm new password" {...register('confirm_password')} />
                                                        <button type="button" className={`input-group-text ${showConfirmPassword ? 'show-password' : ''}`} aria-pressed={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                            <span className="password-eye"></span>
                                                        </button>
                                                    </div>
                                                    <span className="validation_error">{errors.confirm_password?.message}</span>
                                                </div>

                                                <div className="col-md-12 mt-3 text-center">

                                                    <button type="submit" className="btn btn-custom waves-effect waves-light mr-1">Update</button>

                                                    <button type="button" className="btn btn-cancel waves-effect waves-light" onClick={() => navigate(-1)}>Cancel</button>
                                                </div>
                                            </div>
                                            {/* <!-- end col --> */}
                                        </form>
                                        {/* <!-- end form --> */}
                                    </div>
                                    {/* <!-- end row--> */}
                                </div>
                                {/* <!-- end card-body --> */}
                            </div>
                            {/* <!-- end card --> */}
                        </div>
                        {/* <!-- end col --> */}

                    </div>
                    {/* <!-- end row --> */}
                </div>
                {/* <!-- container --> */}
            </div >
            {/* <!-- content --> */}

            {/* ================================ End Page content ============================== */}
        </>
    )
}