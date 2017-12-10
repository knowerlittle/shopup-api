const express = require('express');
const router = express.Router();
const { facebookLogin, googleLogin } = require('./controller');

router.post('/facebook', facebookLogin);
router.post('/google', googleLogin);

module.exports = router;
