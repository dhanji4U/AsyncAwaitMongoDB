import axios from "axios";
import cryptojs from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { removeSessionStorageData } from "../common/Common";

const key = cryptojs.enc.Utf8.parse(process.env.REACT_APP_KEY);
const iv = cryptojs.enc.Utf8.parse(process.env.REACT_APP_IV);

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'accept-language': 'en',
        'Content-Type': 'text/plain'
    }
});

// Body Encryption Request to API
axiosClient.interceptors.request.use(function (request) {

    request.data = bodyEncryption(request.data, true);

    if (localStorage.getItem("ReactToken") !== undefined || localStorage.getItem("ReactToken") !== null) {
        request.headers['token'] = bodyEncryption(localStorage.getItem("ReactToken"), false)
    }
    console.log("Final Request", request.data);
    return request;
});

// Response interceptor
axiosClient.interceptors.response.use(

    function (response) {

        response = bodyDecryption(response.data);
        
        let respData = JSON.parse(response);

        if (respData?.code === -1) {
            // const navigate = useNavigate();
            // navigate('/logout');

            removeSessionStorageData()
            const event = new CustomEvent('unauthorizedEvent');
            window.dispatchEvent(event);

        } else if (respData?.code === 0 || respData?.code === 2) {
            // Common.ErrorAlert(respData.message);
            return respData;
        } else {
            return respData;
        }
    },

    function (error) {

        let res = error.response;

        // console.log("Decrypt Data else response", res);

        if (res !== undefined && res.status === 401) {
            console.log("---------------------- 401 ----------------------")
            // const navigate = useNavigate();
            // navigate('/logout');

            removeSessionStorageData()
            const event = new CustomEvent('unauthorizedEvent');
            window.dispatchEvent(event);

        } else if (res !== undefined && res.status === 400) {
            const response = bodyDecryption(res.data);
            return response;
        } else if (res !== undefined && res.status == 500) {

            const response = { message: res?.statusText }
            return response;

        } else {
            console.error("Looks like there was a problem. Status Code: " + error);
            return Promise.reject(error);
        }
    }
);

function bodyEncryption(request, isStringify) {
    console.log("Encryption Request", request)

    let new_request = (isStringify) ? JSON.stringify(request) : request;
    let encrypted = cryptojs.AES.encrypt(new_request, key, { iv: iv });

    return encrypted.toString();
}

function bodyDecryption(request) {
    let decrypted = cryptojs.AES.decrypt(request.toString(), key, { iv: iv });
    console.log("Decrypt Data", decrypted)

    return decrypted.toString(cryptojs.enc.Utf8);
}

export { axiosClient };