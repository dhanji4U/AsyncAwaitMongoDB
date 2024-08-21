const authModel = require('../models/auth_model');
const CODES = require('../../../../config/status_code');
const middleware = require('../../../../middleware/header_validator');
const validationRules = require('../validation_rules');

/*
** Function to login
** 05-06-2024
*/
const login = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.loginValidation);

    if (valid.status) {
        return authModel.login(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to forgot password
** 15-06-2024
*/
const forgotPassword = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.forgotPasswordValidation);

    if (valid.status) {
        return authModel.forgotPassword(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to reset password
** 15-06-2024
*/
const resetPassword = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.resetPasswordValidation);

    if (valid.status) {
        return authModel.resetPassword(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to change password
** 15-06-2024
*/
const changePassword = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.changePasswordValidation);

    if (valid.status) {
        return authModel.changePassword(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to get user details
** 15-06-2024
*/
const userDetails = async (req, res) => {

    const request = await middleware.decryption(req);

    const userData = await authModel.adminDetails({ _id: request.login_user_id, is_active: 1, is_deleted: 0 });
    const statusCode = (userData !== null) ? CODES.SUCCESS_STATUS : CODES.NOT_FOUND;
    const responseCode = (userData !== null) ? CODES.SUCCESS_CODE : CODES.NODATA_CODE;
    const responseMessage = (userData !== null)
        ? { keyword: 'rest_keywords_admin_data_successfound', components: {} }
        : { keyword: 'rest_keywords_admindetails_not_found', components: {} };

    return middleware.sendResponse(request, res, statusCode, responseCode, responseMessage, userData);
};

/*
** Function to edit profile
** 15-06-2024
*/
const editProfile = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.editProfileValidation);

    if (valid.status) {
        return authModel.editProfile(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to logout
** 15-06-2024
*/
const logout = async (req, res) => {

    const request = await middleware.decryption(req);

    return authModel.logout(request, res);
};

/*
** Function to delete account
** 15-06-2024
*/
const deleteAccount = async (req, res) => {

    const request = await middleware.decryption(req);

    return authModel.deleteAccount(request, res);
};

/*
** Function to otp verification
** 15-06-2024
*/
const otpVerification = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.otpVerificationValidation);

    if (valid.status) {
        return authModel.otpVerification(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to otp resend
** 15-06-2024
*/
const otpResend = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.otpResendValidation);

    if (valid.status) {
        return authModel.otpResend(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

module.exports = {
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    userDetails,
    editProfile,
    logout,
    deleteAccount,
    otpVerification,
    otpResend
};
