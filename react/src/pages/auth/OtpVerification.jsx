import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import * as Common from '../../common/Common'
import GLOBALS from '../../utils/Constant';
import * as authRedux from "../../store/slice/auth_slice";

const OtpVerification = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        otp: Yup.string()
            .required('Please enter verification code')
            .length(4, 'Verification code must be exactly 4 digits')
    });

    let forgotPasswordData = useSelector((state) => state.auth.forgotPassword?.data?.data);

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, setValue } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {

        try {

            const params = {
                user_id: forgotPasswordData?._id ?? localStorage.getItem('forgotPasswordID'),
                type: 'after_forgot',
                otp_code: data.otp
            }

            dispatch(
                authRedux.otpVerification(params)
            ).then((res) => {
                if (res.payload?.code === 1) {

                    // Show success alert
                    Common.SuccessAlert(res.payload.message);
                    // setForgotPasswordData(res.payload.data);

                    navigate("/reset-password");
                } else if (res.payload?.code !== 1) {
                    Common.ErrorAlert(res.payload.message);
                } else {
                    Common.ErrorAlert('Oops! Something went wrong');
                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in login:', error);
        }

    };

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [enabled, setEnabled] = useState([true, false, false, false]);
    const otpBoxReference = useRef([]);

    // Reference to the hidden input
    const hiddenInputRef = useRef();

    function handleChange(value, index) {
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if (value && index < 4 - 1) {
            let newEnabled = [...enabled];
            newEnabled[index + 1] = true;
            setEnabled(newEnabled);
            otpBoxReference.current[index + 1].focus()
        }
    }

    useEffect(() => {
        // Update the hidden input value whenever the OTP changes
        const otpValue = otp.join('');
        setValue('otp', otpValue);
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = otpValue;
        }
    }, [otp, setValue]);

    function handleBackspaceAndEnter(e, index) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus()
        }
        if (e.key === "Enter" && e.target.value && index < 4 - 1) {
            otpBoxReference.current[index + 1].focus()
        }
    }


    const [timer, setTimer] = useState(0); // Timer state
    const [isDisabled, setIsDisabled] = useState(false); // Button disabled state

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setIsDisabled(false);
        }
        return () => clearInterval(interval);
    }, [timer]);


    const resendOTP = () => {

        try {

            const params = {
                user_id: forgotPasswordData?._id ?? localStorage.getItem('forgotPasswordID'),
            }

            dispatch(
                authRedux.otpResend(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    // Show success alert
                    Common.SuccessAlert(response.message);

                } else {
                    // Show error alert
                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');
                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in login:', error);
        }

        setIsDisabled(true);
        setTimer(30); // Set the timer for 30 seconds (or any desired time)
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
                                                    <h2 className='m-0'>OTP Verification</h2>
                                                </div>
                                            </div>
                                            <p className="text-muted mb-4 mt-3">Enter your verification code was sent to the email or phone.</p>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="mb-3">

                                                <div className='d-flex align-items-center gap-3 justify-content-between'>
                                                    {otp.map((digit, index) => (
                                                        <div className="col-sm-2 col-md-2">
                                                            <input key={index} type='text' value={digit} maxLength={1} inputMode="numeric" pattern="[0-9]*"
                                                                onChange={(e) => handleChange(e.target.value, index)}
                                                                onInput={(e) => {
                                                                    if (!/^\d$/.test(e.target.value)) {
                                                                        e.target.value = '';  // Clear the input if it's not a digit
                                                                    }
                                                                }}
                                                                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                                                                ref={(reference) => (otpBoxReference.current[index] = reference)}
                                                                className="form-control text-center p-1"
                                                            // disabled={!enabled[index]}
                                                            />
                                                        </div>
                                                    ))}

                                                </div>

                                                <input type="hidden" id="otp" ref={hiddenInputRef} {...register('otp')} />
                                                <span className="validation_error"> {errors.otp && <span className="error-message">{errors.otp.message}</span>}</span>
                                            </div>

                                            <div className="text-center d-grid">
                                                <button className="btn btn-custom waves-effect waves-light" type="submit">Verify</button>
                                            </div>

                                            <div className="text-center mt-3">
                                                <div className="text">Do not receive 4 digit code?</div>
                                                <button type='button' className="btn btn-link mt-2" onClick={resendOTP} disabled={isDisabled}>
                                                    {isDisabled ? `Resend in ${timer}s` : 'Resend'}
                                                </button>
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

export default OtpVerification
