
const common = require('../../../../config/common');
const CODE = require('../../../../config/status_code');
const logger = require('../../../../logger');
const middleware = require('../../../../middleware/header_validator');

const userSchema = require('../../../schema/user_schema');

const dashboardModel = {

    /*
    ** Function to get dashboard count
    ** 11-06-2024
    */
    async getDashboardCount(request, result) {

        try {

            const whereCondition = await common.getFilterCondition(request, 'user_list');
            
            const userCount = await common.getCount({ ...whereCondition, common_id: request.login_user_id, is_deleted: 0 }, userSchema);

            const dashboardCount = {
                user_count: userCount,
            }

            return middleware.sendResponse(request, result, CODE.SUCCESS_STATUS, CODE.SUCCESS_CODE, { keyword: 'rest_keywords_dashboard_count_successfound', components: {} }, dashboardCount)

        } catch (error) {

            logger.error(error);
            return middleware.sendResponse(request, result, CODE.INTERNAL_ERROR, CODE.ERROR_CODE, { keyword: 'rest_keywords_dashboard_count_failed', components: {} }, null);
        }
    },

}

module.exports = dashboardModel;
