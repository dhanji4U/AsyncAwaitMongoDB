const checkValidatorRules = {

    // -------------------------------------------- Auth Module Validation Starts --------------------------------------------

    otpVerificationValidation: {
        user_id                             : 'required',
        type                                : 'required|in:after_signup,after_edit,after_forgot,after_login',
        otp_code                            : "required|numeric",
        email                               : 'required_if:type,after_edit',
        country_code                        : 'required_if:type,after_edit',
        phone                               : 'required_if:type,after_edit' 
    },

    otpResendValidation: {
        user_id                             : 'required'
    },

    loginValidation: {
        email                               : 'required|email',
        password                            : 'required'
    },

    forgotPasswordValidation: {
        email                               : 'required|email'
    },

    resetPasswordValidation: {
        user_id                             : 'required',
        new_password                        : 'required',
        confirm_password                    : 'required'
    },

    changePasswordValidation: {
        old_password                        : 'required',
        new_password                        : 'required',
        confirm_password                    : 'required'
    },

    editProfileValidation: {
        name                                : 'required',
        email                               : '',
        country_code                        : '',
        phone                               : '',
        profile_image                       : ''
    },

    // -------------------------------------------- Auth Module Validation Ends --------------------------------------------


   


};

module.exports = checkValidatorRules;
