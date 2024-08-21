const express = require('express');

const router = express.Router();
const country_controller = require('../controllers/country_controller');

router.post('/country_list', country_controller.countryList);
router.post('/change_country_status', country_controller.changeCountryStatus);
router.post('/remove_country', country_controller.deleteCountry);

module.exports = router;