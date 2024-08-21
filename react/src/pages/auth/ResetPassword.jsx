import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as Common from '../../common/Common';

import * as authRedux from "../../store/slice/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import GLOBALS from '../../utils/Constant';

const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const forgotPasswordData = useSelector((state) => state.auth.forgotPassword?.data?.data);

    const validationSchema = Yup.object().shape({
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
                user_id: forgotPasswordData?._id ?? localStorage.getItem('forgotPasswordID'),
                new_password: data.new_password,
                confirm_password: data.confirm_password,
            }

            // For change password
            dispatch(
                authRedux.resetPassword(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    Common.SuccessAlert(response.message)
                    navigate("/login");

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
            <div className='loading authentication-bg authentication-bg-pattern'>
                <div className="account-pages mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-4 mt-7">
                                <div className="card bg-pattern">

                                    <div className="card-body p-4">

                                        <div className="text-center w-100 m-auto">
                                            <div className="auth-logo">
                                                <div className="logo logo-dark text-center">
                                                    <span className="logo-lg">
                                                        <img src={process.env.PUBLIC_URL + GLOBALS.LOGO} alt={GLOBALS.APP_NAME} className='logo-img' />
                                                    </span>
                                                    <h2 className='m-0'>Set New Password</h2>
                                                </div>
                                            </div>
                                            <p className="text-muted mb-4 mt-3">Enter your new password.</p>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            {/* New Password */}
                                            <div className="mb-3">
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
                                            <div className="mb-3">
                                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                                <div className="input-group input-group-merge">
                                                    <input type={showConfirmPassword ? 'text' : 'password'} id="confirm_password" className="form-control" placeholder="Confirm new password" {...register('confirm_password')} />
                                                    <button type="button" className={`input-group-text ${showConfirmPassword ? 'show-password' : ''}`} aria-pressed={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        <span className="password-eye"></span>
                                                    </button>
                                                </div>
                                                <span className="validation_error">{errors.confirm_password?.message}</span>
                                            </div>

                                            <div className="text-center d-grid">
                                                <button className="btn btn-custom waves-effect waves-light" type="submit"> Update </button>
                                            </div>

                                        </form>

                                    </div>
                                    {/* <!-- end card-body --> */}
                                </div>
                                {/* <!-- end card --> */}
                            </div>
                            {/* <!-- end col --> */}
                        </div>
                        {/* <!-- end row --> */}
                    </div>
                    {/* <!-- end container --> */}
                </div>
                {/* <!-- end page --> */}
            </div>
        </>
    )
}

export default ResetPassword
