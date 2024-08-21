const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth_controller');

router.post('/login', authController.login);
router.post('/forgot_password', authController.forgotPassword);
router.post('/change_password', authController.changePassword);
router.post('/reset_password', authController.resetPassword);
router.post('/otp_verification', authController.otpVerification);
router.post('/otp_resend', authController.otpResend);
router.get('/user_details', authController.userDetails);
router.post('/edit_profile', authController.editProfile);
router.post('/logout', authController.logout);
router.post('/delete_account', authController.deleteAccount);

module.exports = router;