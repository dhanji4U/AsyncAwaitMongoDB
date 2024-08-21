import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import * as Common from '../../common/Common'
import GLOBALS from '../../utils/Constant';
import * as authRedux from "../../store/slice/auth_slice";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please write proper email address')
            .required('Please enter your email')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {

        try {

            const params = {
                email: data.email
            }

            dispatch(
                authRedux.forgotPassword(params)
            ).then((res) => {
                
                const response = res.payload;

                if (response?.code === 1) {

                    // Show success alert
                    Common.SuccessAlert(response.message);

                    localStorage.setItem("forgotPasswordID", response.data._id);

                    navigate("/otp-verification");

                } else {
                    
                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');

                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in login:', error);
        }
    };

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
                                                    <h2 className='m-0'>Forgot Password</h2>
                                                </div>
                                            </div>
                                            <p className="text-muted mb-4 mt-3">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="mb-3">
                                                <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                <input className="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email" {...register('email')} />
                                                <span className="validation_error">{errors.email?.message}</span>
                                            </div>

                                            <div className="text-center d-grid">
                                                <button className="btn btn-custom waves-effect waves-light" type="submit"> Reset Password </button>
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

export default ForgotPassword
