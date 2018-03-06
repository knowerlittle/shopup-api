const express = require('express');
const router = express.Router();
const { socialLogin, userSignin } = require(__root + 'services/authentication/controller');

router.post('/auth', socialLogin);
router.get('/signin', userSignin);

module.exports = router;
