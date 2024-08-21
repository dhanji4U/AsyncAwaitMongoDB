import { axiosClient } from "./apiClient";

//================================================ Auth APIs Starts ===================================================
export function login(data) {
    return axiosClient.post('auth/login', data);
}
export function logout(data) {
    return axiosClient.post('auth/logout', data);
}
export function changePassword(data) {
    return axiosClient.post('auth/change_password', data);
}
export function getUserDetails(data) {
    return axiosClient.get('auth/user_details', data);
}
export function editProfile(data) {
    return axiosClient.post('auth/edit_profile', data);
}
export function forgotPassword(data) {
    return axiosClient.post('auth/forgot_password', data);
}
export function resetPassword(data) {
    return axiosClient.post('auth/reset_password', data);
}
export function otpVerify(data) {
    return axiosClient.post('auth/otp_verification', data);
}
export function otpResend(data) {
    return axiosClient.post('auth/otp_resend', data);
}
//================================================ Auth APIs Ends ======================================================