const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboard_controller');

router.post('/dashboard_count', dashboardController.dashboardCount);

module.exports = router;