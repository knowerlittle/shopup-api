const express = require('express');
const router = express.Router();
const {
    socialLogin
} = require('./controller')

router.post('/auth/facebook', socialLogin);
router.post('/auth/google', socialLogin);

module.exports = router;