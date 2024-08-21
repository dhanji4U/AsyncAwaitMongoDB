import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as Common from '../../common/Common'
import GLOBALS from '../../utils/Constant';
import Select from 'react-select';

import * as authRedux from "../../store/slice/auth_slice";
import * as commonRedux from "../../store/slice/common_slice";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminDetails, setAdminDetails] = useState(null);
    const owner_id = localStorage.getItem("OwnerID");

    // Get first time details 
    useEffect(() => {

        try {

            // For fetch admin Details API
            dispatch(
                authRedux.getReactData({})
            ).then((res) => {
                if (res.payload?.code === 1) {

                    // console.log(countryList, "country list");
                    // setSelectedImages(countryList);
                    setAdminDetails(res.payload.data);
                } else if (res.payload?.code === 0) {
                    Common.ErrorAlert(res.payload.message);
                } else {
                    console.error('Payload got undefined in getAdminData');
                }
            });

        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in getAdminData:', error)
        }
    }, [owner_id]);

    useEffect(() => {
        dispatch(commonRedux.activeCountries({ is_active: '1' }));
    }, []);

    // To country Listing 
    const countryList = useSelector((state) => state.common.activeCountry?.data?.data || []);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Please enter name'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Please enter email'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Please enter a valid phone number')
            .min(8, 'Phone number must be at least 8 digits')
            .max(15, 'Phone number must be at most 15 digits')
            .required('Please enter phone'),
        // profile_image: Yup.mixed()
        //     .required('Please select profile_image')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { control, register, handleSubmit, formState, setError } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {

        try {

            const params = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                country_code: (data.country_code !== undefined) ? data.country_code.value : adminDetails.country_code,
                password: data.password,
                profile_image: 'default.jpg'
            }

            dispatch(
                authRedux.updateProfile(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    Common.SuccessAlert(response.message);
                    Common.setSessionStorageData(response.data);

                    navigate("/dashboard");

                } else {

                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');

                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in my profile:', error);
        }
    }

    //for image preview
    const [imagePreview, setImagePreview] = useState(process.env.PUBLIC_URL + GLOBALS.DEFAULT_IMAGE);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // if someone doesn't use and there is required validation even if the data is entered(for edit only)
    if (adminDetails === null) return <> </>

    return (
        <>
            {/* ================================ Start Page Content ================================== */}
            <div className="content-page">
                <div className="content">

                    {/* Start Conten */}
                    <div className="container-fluid">

                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                            <li className="breadcrumb-item active">Edit Details</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Edit Profile</h4>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}

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

                                                {/* Image */}
                                                <div className="col-sm-12 mb-3">

                                                    <div className="d-flex justify-content-center">

                                                        {/* Image Preview & Upload */}
                                                        <div className="admin-profile">

                                                            <label className="-label" htmlFor="file">
                                                                <i className="fas fa-camera"></i>
                                                                <span>Change Image</span>
                                                            </label>

                                                            <input className='img-input' id="file" {...register('profile_image')} accept="image/*" type="file" onChange={handleImageChange} />

                                                            <img src={imagePreview} id="output" alt='Profile' width="200" className='img-thumbnail' />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" defaultValue={adminDetails?.name} {...register('name')} />
                                                    <span className="validation_error">{errors.name?.message}</span>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Email</label>
                                                    <input type="text" className="form-control" name="email" id="email" placeholder="Enter email" defaultValue={adminDetails?.email} {...register('email')} />
                                                    <span className="validation_error">{errors.email?.message}</span>
                                                </div>

                                                <div className="col-md-3 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Country Code</label>

                                                    <Controller
                                                        name="country_code"
                                                        control={control}
                                                        {...register('country_code', { required: 'Please select country code' })}
                                                        render={({ field }) => (
                                                            <Select
                                                                options={countryList
                                                                    ? countryList.map((item) => ({
                                                                        value: item.calling_code,
                                                                        label: (
                                                                            <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                                                                                {/* <img key={item.id}
                                                                                    src={item.flag}
                                                                                    alt={`${item.name} flag`}
                                                                                    style={{ width: '20px', marginRight: '8px' }} /> */}
                                                                                {`(${item.calling_code}) ${item.name}`}
                                                                            </div>
                                                                        ),
                                                                    }))
                                                                    : [
                                                                        {
                                                                            value: null,
                                                                            label: 'No countries are available'
                                                                        },
                                                                    ]}
                                                                placeholder="Select Country"
                                                                isSearchable={true} // Enables search functionality
                                                                defaultValue={{
                                                                    value: adminDetails?.country_code,
                                                                    label: (
                                                                        <div key={adminDetails?.country_code_ + adminDetails?.id} className='d-flex align-items-center'>
                                                                            {/* <img
                                                                                key={adminDetails?.country_code}
                                                                                src={countryList?.find((item) => item.calling_code == adminDetails?.country_code)?.flag}
                                                                                alt='flag'
                                                                                className='flag-img'
                                                                            /> */}
                                                                            {`(${adminDetails?.country_code}) ${countryList?.find((item) => item.calling_code == adminDetails?.country_code)?.name}`}
                                                                        </div>
                                                                    ) || null
                                                                }}
                                                                {...field} />
                                                        )} />

                                                    <span className="validation_error">{errors.country_code?.message}</span>
                                                </div>
                                                {/* defaultValue={{value: adminDetails?.country_code, label: "item.name"}} */}

                                                <div className="col-md-9 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Phone</label>
                                                    <input type="text" className="form-control" name="phone" id="phone" placeholder="Enter phone" defaultValue={adminDetails?.phone} {...register('phone')} />
                                                    <span className="validation_error">{errors.phone?.message}</span>
                                                </div>

                                                <div className="col-md-12 mt-3 text-center">

                                                    <button type="submit" className="btn btn-custom waves-effect waves-light mr-1">Update</button>

                                                    <button type="button" className="btn btn-cancel waves-effect waves-light" onClick={() => navigate(-1)}>Cancel</button>
                                                </div>
                                            </div>
                                            {/* end col */}
                                        </form>
                                        {/* end form */}
                                    </div>
                                    {/* end ro */}
                                </div>
                                {/* end card-body */}
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}

                    </div>
                    {/* end row */}
                </div>
                {/* container */}
            </div >
            {/* content */}

            {/* ================================ End Page content ============================== */}
        </>
    )
}

export default MyProfile
