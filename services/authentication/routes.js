const express = require('express');
const socialLogin = require(__root + 'services/authentication/controller');
const router = express.Router();

router.post('/auth', socialLogin);

module.exports = router;
