const express = require('express');

const router = express.Router();
const middleware = require('../../middleware/header_validator');

//Admin Routes
const adminAuthRoutes           = require('./admin/routes/auth_route');
const adminFaqRoutes            = require('./admin/routes/faq_route');



router.use('/', middleware.validateHeaderApiKey);
router.use('/', middleware.validateHeaderToken);


//admin routes
router.use('/admin/auth/', adminAuthRoutes);
router.use('/admin/faq/', adminFaqRoutes);
router.use('/admin/cms/', adminCMSRoutes);



module.exports = router;
