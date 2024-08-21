import { useEffect } from 'react'
import * as Common from '../../common/Common'
import { useNavigate } from 'react-router-dom'

import * as authRedux from "../../store/slice/auth_slice";
import { useDispatch } from "react-redux";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        //For admin logout
        const adminLogout = (request) => {

            try {

                dispatch(
                    authRedux.logout(request)
                ).then((res) => {

                    const response = res.payload;

                    if (response?.code === 1) {

                        Common.SuccessAlert(response.message);
                        Common.removeSessionStorageData();
                        navigate("/");

                    } else {

                        Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');
                        console.error('Payload got undefined');
                    }
                });
            } catch (error) {
                Common.ErrorAlert(error);
                console.error('Error in logout:', error);
            }
        };

        adminLogout({});

    }, [navigate])
}