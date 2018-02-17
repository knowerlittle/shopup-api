const express = require('express');
const { facebookLogin } = require('./controller');
const router = express.Router();

router.post('/auth/facebook', facebookLogin);
// router.post('/google', googleLogin);

module.exports = router;
