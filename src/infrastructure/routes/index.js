const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/callback', notificationController.handleCallback);

module.exports = router;
