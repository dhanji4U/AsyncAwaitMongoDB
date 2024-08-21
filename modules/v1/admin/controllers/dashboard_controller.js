const dashboardModel = require('../models/dashboard_model');
const middleware = require('../../../../middleware/header_validator');

/*
** Function to get dashboard count
** 10-06-2024
*/
const dashboardCount = async (req, res) => {

    const request = await middleware.decryption(req);

    return dashboardModel.getDashboardCount(request, res);
};

module.exports = {
    dashboardCount,
};