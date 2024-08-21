import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import * as Common from '../../common/Common'
import GLOBALS from '../../utils/Constant';
import * as authRedux from "../../store/slice/auth_slice";
import * as commonRedux from '../../store/slice/common_slice';

const Login = () => {

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please write proper email address')
            .required('Please enter your email'),
        password: Yup.string()
            .required('Please enter your password')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['remember_email', 'remember_pwd', 'remember_me']);

    useEffect(() => {
        console.log(userTimezone, "userTimezone");
        // console.log(`Use effect called In Login`);
        if (localStorage.getItem("OwnerLogin")) {
            navigate("/dashboard");
        }
    });

    //For checked in remember me 
    useEffect(() => {

        if (cookies.remember_me !== undefined) {
            setIsChecked(true);
        }
    }, [cookies.remember_me]);

    const onSubmit = (data) => {

        // console.log(cookies, 'data');return
        try {

            const params = {
                email: data.email,
                password: data.password,
            }

            dispatch(
                authRedux.login(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    //for set or unset cookies
                    (data.rememberme || cookies?.remember_me) ? setRememberMeCookies(data) : removeRememberMeCookies();

                    // Store login data
                    Common.setSessionStorageData(response.data);
                    localStorage.removeItem('forgotPasswordID');

                    dispatch(authRedux.getReactData({})); //to store admin in redux state
                    dispatch(commonRedux.activeCountries({ is_active: '1' }));  //to store active countries in redux state

                    // Show success alert
                    Common.SuccessAlert(response.message);

                    // response.data.timezone = data.timezone
                    navigate("/dashboard");
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

    //To handle set RememberMe Cookies
    function setRememberMeCookies(data) {
        setCookie('remember_email', data.email, { maxAge: 86400 });
        setCookie('remember_pwd', data.password, { maxAge: 86400 });
        setCookie('remember_me', data.rememberme, { maxAge: 86400 });
    }

    //To handle remove RememberMe Cookies
    function removeRememberMeCookies() {

        removeCookie('remember_email');
        removeCookie('remember_pwd');
        removeCookie('remember_me');
    }


    //To handle checkbox check and unchecked event
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
                                                <Link className="logo logo-dark text-center">
                                                    <span className="logo-lg">
                                                        <img src={process.env.PUBLIC_URL + GLOBALS.LOGO} alt={GLOBALS.APP_NAME} className='logo-img' />
                                                    </span>
                                                    <h2 className='m-0'>Property Owner Panel</h2>
                                                </Link>
                                            </div>
                                            <p className="text-muted mb-4 mt-3">Enter your email address and password to access property owner panel.</p>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="mb-3">
                                                <label htmlFor="emailaddress" className="form-label">Email address</label>
                                                <input className="form-control" type="email" id="emailaddress" required="" defaultValue={cookies.remember_email} placeholder="Enter your email" {...register('email')} />
                                                <span className="validation_error">{errors.email?.message}</span>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <div className="input-group input-group-merge">
                                                    <input type={showPassword ? 'text' : 'password'} id="password" className="form-control" defaultValue={cookies.remember_pwd} placeholder="Enter your password" {...register('password')} />
                                                    <button type='button' className={`input-group-text ${showPassword ? 'show-password' : ''}`} data-password={showPassword} onClick={() => setShowPassword(!showPassword)}>
                                                        <span className="password-eye"></span>
                                                    </button>
                                                </div>
                                                <span className="validation_error">{errors.password?.message}</span>
                                            </div>

                                            <input type="hidden" name="timezone" id="timezone" defaultValue={userTimezone} {...register('timezone')} />

                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" name="rememberme" id="rememberme" checked={isChecked} onClick={handleCheckboxChange} {...register('rememberme')} />
                                                    <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="text-center d-grid">
                                                <button className="btn btn-custom waves-effect waves-light" type="submit">Log In</button>

                                                <Link to="/forgot-password" className="text-black-50 font-13 mt-3">
                                                    Forgot your password?
                                                </Link>
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

export default Login
