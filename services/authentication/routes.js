const express = require('express');
const { socialLogin, userSignin } = require(__root + 'services/authentication/controller');
const router = express.Router();

router.post('/auth', socialLogin);
router.post('/signin', userSignin);

module.exports = router;
