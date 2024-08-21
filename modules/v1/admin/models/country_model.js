const moment = require('moment');
const { ObjectId } = require('mongodb');

const common = require('../../../../config/common');
const CODE = require('../../../../config/status_code');
const countrySchema = require('../../../schema/country_schema');
const middleware = require('../../../../middleware/header_validator');
const logger = require('../../../../logger');
const GLOBALS = require('../../../../config/constants');

const countryModel = {

    /*
    ** Function to get details for users
    */
    async countryDetails(condition) {

        try {

            const countryDetails = await common.getSingleDetails(countrySchema, condition);

            return countryDetails;
        } catch (error) {
            logger.error(error);
        }
    },

    /*
    ** Function to get country list
    ** 08-01-2024
    */
    async countryListing(request, result) {

        try {

            const whereCondition = await common.getFilterCondition(request, 'country_list');

            const condition = { is_deleted: 0, ...whereCondition };

            const countryList = await common.getDetails(countrySchema, condition, { _id: -1 });

            return countryList !== null
                ? middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_countrylist_successfound', components: {} }, countryList)
                : middleware.sendResponse(request, result, CODE.NOT_FOUND, CODE.NODATA_CODE, { keyword: 'rest_keywords_countrylist_notfound', components: {} }, null);

        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_countrylist_failed', components: {} }, null);
        }
    },

    /*
    ** Function to change Status
    ** 03-01-2024
    */
    async changeCountryStatus(request, result) {

        try {

            const statusUpdate = {
                is_active: request.status,
                update_time: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
            };

            const field_status = (request.status == '1') ? 'activated' : 'deactivated';

            // request.country_id is an array of strings
            const countryIds = request.country_id.map(id => new ObjectId(id));

            const updateStatus = await common.updateData({ _id: { $in: countryIds } }, statusUpdate, countrySchema);

            return updateStatus !== null
                ? middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_country_changestatus_success', components: { status: field_status } }, null)
                : middleware.sendResponse(request, result, CODE.NOT_FOUND, CODE.NODATA_CODE, { keyword: 'rest_keywords_country_changestatus_failed', components: {} }, null);

            // return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_country_changestatus_success', components: { status: field_status } }, null)

        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_somethingwrong_changestatus_country', components: {} }, null);
        }
    },

    /*
    ** Function to change Status
    ** 03-01-2024
    */
    async deleteCountry(request, result) {

        try {

            const statusUpdate = {
                is_deleted: '1',
                update_time: moment.utc(new Date()).format(GLOBALS.FULL_DATE)
            };

            // request.country_id is an array of strings
            const countryIds = request.country_id.map(id => new ObjectId(id));

            const updateStatus = await common.updateData({ _id: { $in: countryIds } }, statusUpdate, countrySchema);

            return updateStatus !== null
                ? middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_country_removed_success', components: {} }, null)
                : middleware.sendResponse(request, result, CODE.NOT_FOUND, CODE.NODATA_CODE, { keyword: 'rest_keywords_country_removed_failed', components: {} }, null);

        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_somethingwrong_changestatus_country', components: {} }, null);
        }
    },


    /*
    ** Function to signup for users
    ** 03-01-2024
    */
    async addCountry(request, result) {

        try {

            const checkUniqueFields = await adminModel.checkUniqueFields('', request);

            if (checkUniqueFields.unique) {


                request.insert_time = moment.utc(new Date()).format(GLOBALS.FULL_DATE);
                request.update_time = moment.utc(new Date()).format(GLOBALS.FULL_DATE);


                const newCountry = new countrySchema(request);

                await newCountry.validate(); // Validate the user data

                const response = await newCountry.save(); // Save user data to MongoDB

                if (response && response._id) {

                    return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_add_country_success', components: {} }, response);

                } else {
                    // Handle the case where the response is unexpected or falsy
                    return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_add_country_failed', components: {} }, null);
                }
            } else {
                return middleware.sendResponse(request, result, CODE.NOT_FOUND, checkUniqueFields.code, checkUniqueFields.message, null);
            }
        } catch (error) {
            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_add_country_failed', components: {} }, null);
        }
    },
}

module.exports = countryModel;