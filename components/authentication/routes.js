const express = require('express');
const socialLogin = require(__root + 'components/authentication/controller');
const router = express.Router();

router.post('/auth', socialLogin);

module.exports = router;
