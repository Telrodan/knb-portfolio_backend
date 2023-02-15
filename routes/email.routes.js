const express = require('express');
const emailController = require('../controllers/email.controller');

const router = express.Router();

router.route('/send-email').post(emailController.sendEmail);

module.exports = router;
