const randtoken = require('rand-token').generator();
const moment = require('moment');
const cryptoLib = require('cryptlib');

const common = require('../../../../config/common');
const CODE = require('../../../../config/status_code');
const userSchema = require('../../../schema/user_schema');
const middleware = require('../../../../middleware/header_validator');
const logger = require('../../../../logger');
const GLOBALS = require('../../../../config/constants');
const emailTemplate = require('../../../../config/template');
const shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);

const authModel = {

    /*
    ** Function to get details for users
    */
    async authDetails(condition) {

        try {
            const userDetails = await common.getSingleDetails(userSchema, condition);

            return userDetails;
        } catch (error) {
            logger.error(error);
        }
    },


    /*
    ** Function to get details for users
    */
    async updateUser(condition, params) {

        try {

            const updateDetails = await userSchema.findOneAndUpdate(condition, { $set: params }, { returnDocument: 'after' });

            return (updateDetails != null) ? updateDetails : null;

        } catch (error) {
            logger.error(error);
        }
    },

    /*---------------------------------------- Unique Check Starts ------------------------------------------ */

    /*
    ** Function for check unique field for users
    */
    async checkUniqueFields(user_id, request) {
        try {
            const emailResult = await authModel.checkUniqueEmail(user_id, request);
            if (emailResult.unique === false) {
                return emailResult;
            } else {

                const phoneResult = await authModel.checkUniquePhone(user_id, request);
                return phoneResult;
            }
        } catch (error) {
            logger.error(error);
            return { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_somethingwrong_check_uniquefields', components: {}, }, unique: false };
        }
    },

    /*
    ** Function to check email uniqueness
    */
    async checkUniqueEmail(user_id, request) {
        try {
            if (request.email !== undefined && request.email !== '') {

                const query = { email: request.email, is_deleted: 0 };

                if (user_id != undefined && user_id != '' && user_id) {
                    query._id = { $ne: user_id };
                }

                const authprofile = await userSchema.findOne(query);

                return authprofile !== null
                    ? { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_duplicate_email', components: {} }, unique: false }
                    : { code: CODE.SUCCESS_CODE, message: { keyword: 'rest_keywords_success', components: {} }, unique: true };

            } else {
                return { code: CODE.SUCCESS_CODE, message: 'rest_keywords_success', unique: true };
            }
        } catch (error) {
            // console.log(error, "in checkUniqueEmail catch");

            logger.error(error);
            return { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_failed_to_check_duplicate_email', components: {}, }, unique: false };
        }
    },

    /*
    ** Function to check phone uniqueness
    */
    async checkUniquePhone(user_id, request) {
        try {
            if (request.country_code !== undefined && request.country_code !== '' && request.phone !== undefined && request.phone !== '') {

                const query = { phone: request.phone, is_deleted: 0, };

                if (user_id != undefined && user_id != '' && user_id) {
                    query._id = { $ne: user_id };
                }

                const authprofile = await userSchema.findOne(query);

                return authprofile !== null
                    ? { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_duplicate_phonenumber', components: {} }, unique: false }
                    : { code: CODE.SUCCESS_CODE, message: { keyword: 'rest_keywords_success', components: {} }, unique: true };

            } else {

                return { code: CODE.SUCCESS_CODE, message: { keyword: 'rest_keywords_success', components: {}, }, unique: true };
            }
        } catch (error) {
            logger.error(error);
            return { code: CODE.ERROR_CODE, message: { keyword: 'rest_keywords_failed_to_check_duplicate_phonenumber', components: {}, }, unique: false };
        }
    },

    /*---------------------------------------- Unique Check Ends ------------------------------------------ */

    /*
    ** Function to verify OTP
    ** 02-06-2024
    */
    async otpVerification(request, result) {

        try {

            const condition = { _id: request.user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                if (authProfile.otp_code != request.otp_code) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, { keyword: 'rest_keywords_verify_otp_fail', components: {} }, null);

                } else {

                    let verify_user = {
                        otp_code: '',
                        updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE),
                        verify_time: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                    };

                    if (request.type == 'after_edit') {

                        verify_user.phone = request.phone;
                        verify_user.country_code = request.country_code;
                        verify_user.email = request.email;

                    } else if (request.type == 'after_login') {

                        verify_user.otp_status = 'Verified';

                    } else if (request.type == 'after_forgot') {

                        verify_user.forgot_verify = 'Verified';
                    }

                    const updateDetails = await authModel.updateUser({ _id: request.user_id }, verify_user);

                    //Delete device object
                    delete updateDetails.device

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_verify_otp_success', components: {} }, updateDetails);
                }
            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.NODATA_CODE, { keyword: 'rest_keywords_authdetailsnot_found', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_failed_to_verify_otp', components: {} }, null);
        }
    },

    /*
    ** Function to Re-Send OTP
    ** 02-06-2024
    */
    async otpResend(request, result) {

        try {

            const condition = { _id: request.user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const otpCode = await common.getOTPCode(4);

                const otpUpdate = {
                    otp_status: 'Unverified',
                    otp_code: otpCode,
                    updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                };

                const phone = authProfile.country_code + authProfile.phone;
                const message = `Your New OTP Code is ${otpCode}`;

                const smsSended = await common.sendSMS(phone, message, otpCode);

                if (smsSended) {

                    const updateDetails = await authModel.updateUser({ _id: request.user_id }, otpUpdate);

                    //Delete device object
                    delete updateDetails.device

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_resending_otp_success', components: {} }, updateDetails);

                } else {
                    return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.SEND_SMS_FAILED, { keyword: 'rest_keywords_somethingwrong_sendingotp_on_phone', components: {} }, null);
                }
            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, CODE.NODATA_CODE, { keyword: 'rest_keywords_authdetailsnot_found', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_resend_otp_failed', components: {} }, null);
        }
    },

    /*
    ** Function to check login details of users
    ** 02-06-2024
    */
    async login(request, result) {

        try {

            const condition = { email: request.email, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile !== null) {

                const encPass = await cryptoLib.encrypt(request.password, shaKey, GLOBALS.IV);

                if (authProfile.password !== encPass) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, { keyword: 'rest_keywords_invalid_password', components: {} }, null);

                } else if (authProfile.is_active === 0) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ACCOUNT_INACTIVE, { keyword: 'rest_keywords_inactive_accountby_admin', components: {} }, null);

                } else {
                    const token = randtoken.generate(64, '0123456789abcdefghijklnmopqrstuvwxyz');

                    const loginParams = {
                        token: token,
                        login_status: "Online",
                        last_login: moment.utc(new Date()).format(GLOBALS.LONG_DATE),
                        updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                    };

                    const updateDetails = await authModel.updateUser({ _id: authProfile._id }, loginParams);
               
                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_user_login_success', components: {} }, updateDetails);
                }
            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.NODATA_CODE, { keyword: 'rest_keywords_invalid_logindetails', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_resend_otp_failed', components: {} }, null);
        }
    },

    /*
    ** Function to forgot password
    ** 04-06-2024
    */
    async forgotPassword(request, result) {

        try {

            const condition = { email: request.email, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const otpCode = await common.getOTPCode(4);
                const token = randtoken.generate(32, '0123456789abcdefghijklnmopqrstuvwxyz');

                const forgotParams = {
                    otp_code: otpCode,
                    forgot_password_token: token,
                    forgot_verify: 'Unverified',
                    forgot_password_time: moment.utc(new Date()).format(GLOBALS.LONG_DATE),
                    updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                };

                const userData = {
                    name: authProfile.name,
                    otp_code: otpCode
                };

                const phone = authProfile.country_code + authProfile.phone;
                const message = `Your New OTP Code is ${otpCode}`;

                const smsSended = await common.sendSMS(phone, message, otpCode);

                if (smsSended) {

                    const verifyTemplate = await emailTemplate.verify_email(userData);

                    const subject = GLOBALS.APP_NAME + ' Verify Email';

                    const emailSended = await common.sendEmail(subject, authProfile.email, verifyTemplate);

                    if (emailSended) {

                        const updateDetails = await authModel.updateUser({ _id: authProfile._id }, forgotParams);

                        //Delete device object
                        delete updateDetails.device

                        return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_forgot_password_success', components: {} }, updateDetails);

                    } else {

                        return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SEND_EMAIL_FAILED, { keyword: 'rest_keywords_somethingwrong_sendingotp_on_email', components: {} }, null);
                    }

                } else {
                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SEND_SMS_FAILED, { keyword: 'rest_keywords_somethingwrong_sendingotp_on_phone', components: {} }, null);
                }

            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_forgot_password_failed', components: {} }, null);
        }
    },

    /*
    ** Function to reset the password of users
    ** 04-06-2024
    */
    async resetPassword(request, result) {

        try {

            const condition = { _id: request.user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const password = await cryptoLib.decrypt(authProfile.password, shaKey, GLOBALS.IV);

                if (request.new_password === password) {

                    return middleware.sendResponse(request, result, CODE.UNAUTHORIZED, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_newold_password_similar', components: {} }, null);
                } else if (request.confirm_password !== request.new_password) {

                    return middleware.sendResponse(request, result, CODE.UNAUTHORIZED, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_newconfirm_password_differt', components: {} }, null);
                } else {

                    const newPassword = await cryptoLib.encrypt(request.new_password, shaKey, GLOBALS.IV);

                    const resetPasswordParams = {
                        password: newPassword,
                        updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                    };

                    const updateDetails = await authModel.updateUser({ _id: request.user_id }, resetPasswordParams);

                    //Delete device object
                    delete updateDetails.device

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_user_change_password_success', components: {} }, updateDetails);
                }

            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_change_password_failed', components: {} }, null);
        }
    },

    /*
    ** Function to change password of users
    ** 08-06-2024
    */
    async changePassword(request, result) {

        try {

            const condition = { _id: request.login_user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const password = await cryptoLib.decrypt(authProfile.password, shaKey, GLOBALS.IV);

                if (request.old_password !== password) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_old_password_incorrect', components: {} }, null);

                } else if (request.new_password === password) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_newold_password_similar', components: {} }, null);

                } else if (request.confirm_password !== request.new_password) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_newconfirm_password_differt', components: {} }, null);

                } else {

                    const newPassword = await cryptoLib.encrypt(request.new_password, shaKey, GLOBALS.IV);

                    const changePasswordParams = {
                        password: newPassword,
                        updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
                    };

                    const updateDetails = await authModel.updateUser({ _id: request.login_user_id }, changePasswordParams);

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_user_change_password_success', components: {} }, updateDetails);
                }

            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_user_change_password_failed', components: {} }, null);
        }
    },

    /*
    ** Function to edit profile for users
    ** 06-06-2024
    */
    async editProfile(request, result) {

        try {

            const condition = { _id: request.login_user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const checkUniqueFields = await authModel.checkUniqueFields(request.login_user_id, request);

                if (checkUniqueFields.unique) {

                    const editProfile = {
                        name: request.name,
                        updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE),
                        ...(request.email !== undefined && request.email !== '' && { email: request.email }),
                        ...(request.country_code !== undefined && request.country_code !== '' && { country_code: request.country_code }),
                        ...(request.phone !== undefined && request.phone !== '' && { phone: request.phone }),
                        ...(request.profile_image !== undefined && request.profile_image !== '' && { profile_image: request.profile_image }),
                    };

                    if (request.phone != undefined && request.country_code != undefined && (request.phone != authProfile.phone || request.country_code != authProfile.country_code)) {

                        const otpCode = await common.getOTPCode(4);

                        const phone = authProfile.country_code + authProfile.phone;
                        const message = `Your New OTP Code is ${otpCode}`;

                        const smsSended = await common.sendSMS(phone, message, otpCode);

                        if (smsSended) {

                            editProfile.otp_status = 'Unverified';
                            editProfile.otp_code = otpCode;

                            const updateDetails = await authModel.updateUser({ _id: authProfile._id }, editProfile);

                            return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_profile_update_success', components: {} }, updateDetails); // redirect to otp verify screen for verify updated phone

                        } else {

                            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.SEND_SMS_FAILED, { keyword: 'rest_keywords_somethingwrong_sendingotp_on_phone', components: {} }, null);
                        }
                    } else {

                        const updateDetails = await authModel.updateUser({ _id: request.login_user_id }, editProfile);

                        return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_profile_update_success', components: {} }, updateDetails);
                    }

                } else {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, checkUniqueFields.code, checkUniqueFields.message, null);
                }
            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_profile_update_failed', components: {} }, null);
        }
    },

    /*
    ** Function to logout for users
    ** 04-06-2024
    */
    async logout(request, result) {

        try {

            const condition = { _id: request.login_user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const logoutParams = {
                    login_status: 'Offline',
                    token: '',
                    updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE),
                    device: {
                        device_token: '',
                    }
                };

                const updateDetails = await authModel.updateUser({ _id: request.login_user_id }, logoutParams);

                const statusCode = (updateDetails !== null) ? CODE.SUCCESS_STATUS : CODE.INTERNAL_ERROR;
                const responseCode = (updateDetails !== null) ? CODE.SUCCESS_CODE : CODE.ERROR_CODE;
                const responseMessage = (updateDetails !== null)
                    ? { keyword: 'rest_keywords_userlogout_success', components: {} }
                    : { keyword: 'rest_keywords_userlogout_failed', components: {} };

                return middleware.sendResponse(request, result, statusCode, responseCode, responseMessage, null);

            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_profile_update_failed', components: {} }, null);
        }
    },

    /*
    ** Function to delete account 
    ** 04-06-2024
    */
    async deleteAccount(request, result) {

        try {

            const condition = { _id: request.login_user_id, is_active: 1, is_deleted: 0 };

            const authProfile = await authModel.authDetails(condition);

            if (authProfile != null) {

                const deleteAccountParams = {
                    is_deleted: '1',
                    login_status: 'Offline',
                    token: '',
                    updated_at: moment.utc(new Date()).format(GLOBALS.FULL_DATE),
                    device: {
                        device_token: '',
                    }
                };

                const updateDetails = await authModel.updateUser({ _id: request.login_user_id }, deleteAccountParams);

                const statusCode = (updateDetails !== null) ? CODE.SUCCESS_STATUS : CODE.INTERNAL_ERROR;
                const responseCode = (updateDetails !== null) ? CODE.SUCCESS_CODE : CODE.ERROR_CODE;
                const responseMessage = (updateDetails !== null)
                    ? { keyword: 'rest_keywords_userdeleted_success', components: {} }
                    : { keyword: 'rest_keywords_userdeleted_failed', components: {} };

                return middleware.sendResponse(request, result, statusCode, responseCode, responseMessage, null);

            } else {

                return middleware.sendResponse(request, result, CODE.SUCCESS_CODE, CODE.NODATA_CODE, { keyword: 'rest_keywords_user_doesnot_exist', components: {} }, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_profile_update_failed', components: {} }, null);
        }
    },
};

module.exports = authModel;