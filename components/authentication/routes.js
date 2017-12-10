const express = require('express');
const router = express.Router();
const {
    socialLogin
} = require('./controller')

router.get('/auth/facebook', socialLogin);
router.get('/auth/google', socialLogin);

module.exports = router;