const express = require('express');
const { facebookLogin } = require(__root + 'components/authentication/controller');
const router = express.Router();

router.post('/auth/facebook', facebookLogin);
// router.post('/google', googleLogin);

module.exports = router;
