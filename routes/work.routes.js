const express = require('express');
const workController = require('../controllers/work.controller');

const router = express.Router();

router.route('/').post(workController.addWork).get(workController.getWorks);

module.exports = router;
