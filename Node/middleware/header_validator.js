const cryptoLib = require('cryptlib');
const GLOBALS = require('../config/constants');
const shaKey = cryptoLib.getHashSha256(GLOBALS.KEY, 32);
const { default: localizify } = require('localizify');
const en = require('../language/en');
const ar = require('../language/ar');
const { t } = require('localizify');
const logger = require('../logger');
const codes = require('../config/status_code');

const userSchema = require("../modules/schema/user_schema");
const adminSchema = require("../modules/schema/admin_schema");

const cryptoJS = require('crypto-js');
const common = require('../config/common');

const ADMIN_KEY = cryptoJS.enc.Utf8.parse(GLOBALS.ADMIN_KEY);
const ADMIN_IV = cryptoJS.enc.Utf8.parse(GLOBALS.ADMIN_IV);


let access_level;

// access_level: '1'  = admin panel API request cryptoJS


// methods that do not check token
const bypassMethod = new Array("signup", "otp_verify", "otp_resend", "login", "forgot_password", "country_list", "reset_password", "master_category", "send_notification", "faq_list", "complete_profile", "get_lang_message", "cryptojs_request_decryption", "cryptojs_request_encryption");

// method that not require api key
const bypassHeaderKey = new Array('cryptojs_request_encryption', 'cryptojs_request_decryption');

const headerValidator = {

    // function for extract accept language from request header and set in req globaly
    async extractHeaderLanguage(req, res, next) {

        try {

            const acceptLanguageHeader = req.headers['accept-language'];
            let language;

            if (acceptLanguageHeader && acceptLanguageHeader !== 'en-GB,en-US;q=0.9,en;q=0.8') {
                language = acceptLanguageHeader;
            } else {
                language = 'en';
            }

            req.lang = language;

            access_level = (req.headers["access-level"] != undefined && req.headers["access-level"] != "") ? req.headers["access-level"] : 0;

            if (language == 'ar') {
                localizify.add(language, ar).setLocale('ar');
            } else {
                localizify.add(language, en).setLocale('en');
            }
            next(); // Use next to end the middleware function

        } catch (error) {
            logger.error(error);
        }
    },

    /*
    ** Function to validate API key of header (Note : Header keys are encrypted)
    */
    async validateHeaderApiKey(req, res, next) {

        try {

            const apiKey = req.headers['api-key'];

            const pathData = req.path.split("/");
            const index = (access_level != '0') ? 3 : 2;

            if (bypassHeaderKey.indexOf(pathData[index]) === -1) {

                if (apiKey) {
                    const decryptedApiKey = (access_level != '0')
                        ? cryptoJS.AES.decrypt(apiKey, ADMIN_KEY, { iv: ADMIN_IV }).toString(cryptoJS.enc.Utf8)
                        : cryptoLib.decrypt(apiKey, shaKey, GLOBALS.IV);

                    if (decryptedApiKey === GLOBALS.API_KEY) {
                        next();
                    } else {
                        headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_invalid_api_key', components: {} }, null);
                    }
                } else {
                    headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_invalid_api_key', components: {} }, null);
                }
            } else {
                next();
            }
        } catch (error) {
            logger.error(error);
            headerValidator.sendResponse(req, res, codes.INTERNAL_ERROR, codes.INVALID_CODE, { keyword: 'rest_keywords_keywords_internal_error', components: {} }, null);
        }
        return false;
    },

    // Function to validate the token of any user before every request
    async validateHeaderToken(req, res, next) {
        try {

            const headerToken = req.headers.token || '';
            const pathData = req.path.split('/');
            const index = (access_level != '0') ? 3 : 2;
            if (bypassMethod.indexOf(pathData[index]) !== -1) {

                next();
            } else {

                if ((headerToken == undefined && headerToken == '') || (req.headers['token'] && req.headers['token'] == '')) {

                    return headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_token_not_found', components: {} }, null);

                } else {

                    const decryptToken = (key, iv, schema) => {

                        const decryptedToken = (access_level != '0')
                            ? cryptoJS.AES.decrypt(headerToken, key, { iv }).toString(cryptoJS.enc.Utf8)
                            : cryptoLib.decrypt(req.headers['token'], key, iv).replace(/\s/g, '');

                        return common.getSingleDetails(schema, { token: decryptedToken });
                    };

                    let userDetails;

                    if (access_level === '1') {
                        userDetails = await decryptToken(ADMIN_KEY, ADMIN_KEY, adminSchema);
                    } else if (access_level === '2') {
                        userDetails = await decryptToken(ADMIN_KEY, ADMIN_KEY, newSchema);
                    } else {
                        userDetails = await decryptToken(shaKey, GLOBALS.IV, userSchema);
                    }

                    if (userDetails) {

                        req.login_user_id = userDetails._id;

                        // req.token = userDetails.token;

                        next();
                    } else {
                        return headerValidator.sendResponse(req, res, codes.UNAUTHORIZED, codes.INVALID_CODE, { keyword: 'rest_keywords_tokeninvalid', components: {} }, null);
                    }
                }
            }
        } catch (error) {
            logger.error(error);
            return headerValidator.sendResponse(res, codes.INTERNAL_ERROR, codes.INVALID_CODE, { keyword: 'rest_keywords_tokeninvalid', components: {} }, null);
        }
    },

    // Decrypt user request
    async decryption(req) {

        try {

            let decryptedBody;

            if (Object.keys(req.body).length !== 0) {
                decryptedBody = (access_level != '0')
                    ? cryptoJS.AES.decrypt(req.body, ADMIN_KEY, { iv: ADMIN_IV }).toString(cryptoJS.enc.Utf8)
                    : cryptoLib.decrypt(req.body, shaKey, GLOBALS.IV);
            }

            const parsedBody = (decryptedBody !== undefined) ? JSON.parse(decryptedBody) : {};

            const request = {
                lang: req.lang,
                login_user_id: req.login_user_id,
                ...parsedBody
            };

            return request;

        } catch (error) {
            logger.error(error);
            return {};
        }
    },

    // Encrypt user request
    async encryption(req) {
        try {

            const response = (access_level != '0')
                ? cryptoJS.AES.encrypt(JSON.stringify(req), ADMIN_KEY, { iv: ADMIN_IV }).toString()
                : cryptoLib.encrypt(JSON.stringify(req), shaKey, GLOBALS.IV);

            return response;

        } catch (error) {
            logger.error(error);
            return {};
        }
    },

    async sendResponse(req, res, statusCode, responseCode, responseMessage, responseData) {
        try {
            const formedMsg = await headerValidator.getMessage(req.lang, responseMessage.keyword, responseMessage.components);

            const resultObj = { code: responseCode, message: formedMsg };

            if (responseData !== null) {
                resultObj.data = responseData;
            }

            const response = await headerValidator.encryption(resultObj);

            res.status(statusCode).json(response);
        } catch (error) {
            logger.error(error);
            // res.status(500).json({ code: codes.INTERNAL_ERROR, message: 'An internal error occurred' });
        }
    },


    async getMessage(requestLanguage, keywords, components) {
        try {
            if (requestLanguage === 'en') {
                localizify.add('en', en).setLocale(requestLanguage);
            }

            const returnMessage = await t(keywords, components);
            return returnMessage;
        } catch (error) {
            logger.error(error);
            throw error; // Handle or log the error appropriately
        }
    },

    // check Validation Rules
    checkValidationRules: async (request, rules) => {
        try {
            const v = require('Validator').make(request, rules);
            const validator = {
                status: true,
            }
            if (v.fails()) {
                const ValidatorErrors = v.getErrors();
                validator.status = false
                for (const key in ValidatorErrors) {
                    validator.error = ValidatorErrors[key][0];
                    break;
                }
            }
            return validator;
        } catch (error) {
            logger.error(error)
        }
        return false;

    },


    cryptoJsEncryption(data) {
        try {
            const encryptData = crypto.AES.encrypt(data, ADMIN_KEY, { iv: ADMIN_IV }).toString();
            return encryptData
        } catch (error) {
            console.log(error);
            return null; // Return null or handle the error in a way that suits your application
        }
    },


    /**
    * Function is for decryption demo
    * @param {req} req
    * @param {res} res
    */
    cryptoJsRequestEncryption: async (req, res) => {

        try {

            const response = cryptoJS.AES.encrypt(req.body, ADMIN_KEY, { iv: ADMIN_IV }).toString();

            res.json(response)
        } catch (error) {
            console.log(error);
        }
    },

    /**
    * Function is for decryption demo
    * @param {req} req
    * @param {res} res
    */
    cryptoJsRequestDecryption: function (req, res) {

        let response = cryptoJS.AES.decrypt(req.body, ADMIN_KEY, { iv: ADMIN_IV }).toString(cryptoJS.enc.Utf8);
        console.log(response, "response");
        response = JSON.parse(response);

        res.json(response);
    },


}

module.exports = headerValidator
