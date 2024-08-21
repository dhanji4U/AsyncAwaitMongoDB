import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as Common from '../../common/Common'

import { useDispatch } from "react-redux";
import { contactUs } from "../../store/slice/cms_slice";

const ContactUs = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Please enter name'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Please enter email'),
        subject: Yup.string()
            .required('Please enter subject'),
        description: Yup.string()
            .required('Please enter description'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { control, register, handleSubmit, formState, setError } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (data) => {

        try {

            const params = {
                name: data.name,
                email: data.email,
                common_id: localStorage.getItem("OwnerID"),
                subject: data.subject,
                description: data.description,
                user_type: 'Property Owner'
            }

            dispatch(
                contactUs(params)
            ).then((res) => {
                if (res.payload?.code === 1) {

                    Common.SuccessAlert(res.payload.message);

                    navigate("/dashboard");
                } else if (res.payload?.code === 0) {
                    Common.ErrorAlert(res.payload.message);
                } else {
                    console.error('Payload got undefined');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
        }
    }

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
                                            <li className="breadcrumb-item active">Contact Us</li>
                                        </ol>
                                    </div>
                                    <h4 className="page-title">Contact Us</h4>
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

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Name</label>
                                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter name" {...register('name')} />
                                                    <span className="validation_error">{errors.name?.message}</span>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Email</label>
                                                    <input type="text" className="form-control" name="email" id="email" placeholder="Enter email" {...register('email')} />
                                                    <span className="validation_error">{errors.email?.message}</span>
                                                </div>

                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Subject</label>
                                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Enter subject" {...register('subject')} />
                                                    <span className="validation_error">{errors.subject?.message}</span>
                                                </div>

                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="simpleinput" className="form-label">Description</label>
                                                    <input type="text" className="form-control" name="description" id="description" placeholder="Enter description" {...register('description')} />
                                                    <span className="validation_error">{errors.description?.message}</span>
                                                </div>

                                                <div className="col-md-12 mt-3 text-center">

                                                    <button type="submit" className="btn btn-custom waves-effect waves-light mr-1">Submit</button>

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

export default ContactUs
