const countryModel = require('../models/country_model');
const CODES = require('../../../../config/status_code');
const middleware = require('../../../../middleware/header_validator');
const validationRules = require('../validation_rules');

const countryList = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.countryListValidation);

    if (valid.status) {
        return countryModel.countryListing(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

const changeCountryStatus = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.countryStatusChangeValidation);

    if (valid.status) {
        return countryModel.changeCountryStatus(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

const deleteCountry = async (req, res) => {

    const request = await middleware.decryption(req);
    const valid = await middleware.checkValidationRules(request, validationRules.removeCountryValidation);

    if (valid.status) {
        return countryModel.deleteCountry(request, res);
    }

    return middleware.sendResponse(req, res, CODES.SUCCESS_STATUS, CODES.ERROR_CODE, { keyword: 'rest_keywords_validation_error', components: { error: valid.error } }, null);
};

module.exports = {
    countryList,
    changeCountryStatus,
    deleteCountry
}