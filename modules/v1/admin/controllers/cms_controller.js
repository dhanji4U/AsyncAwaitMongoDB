const cmsModel = require('../models/cms_model');
const CODES = require('../../../../config/status_code');
const middleware = require('../../../../middleware/header_validator');
const validationRules = require('../validation_rules');

/*
** Function to get faq list
** 10-06-2024
*/
const faqList = async (req, res) => {

    const request = await middleware.decryption(req);
    return cmsModel.faqListing(request, res);
};

/*
** Function to get cms content
** 10-06-2024
*/
const cmsContent = async (req, res) => {

    const request = await middleware.decryption(req);

    const valid = await middleware.checkValidationRules(request, validationRules.cmsContentValidation);

    if (valid.status) {
        return cmsModel.cmsData(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

/*
** Function to add contact us data
** 10-06-2024
*/
const contactUs = async (req, res) => {

    const request = await middleware.decryption(req);

    const valid = await middleware.checkValidationRules(request, validationRules.contactUsValidation);
    
    if (valid.status) {
        return cmsModel.addContactUs(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};


module.exports = {
    faqList,
    cmsContent,
    contactUs
};