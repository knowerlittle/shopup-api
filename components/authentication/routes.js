const express = require('express');
const router = express.Router();
const {
    getFacebookAuth,
    receiveFacebookAuth,
    getGoogleAuth,
    receiveGoogleAuth,
    sendToken
} = require('./controller')
const passport = require('passport');

router.get('/facebook', getFacebookAuth);

router.get('/facebook/callback', receiveFacebookAuth, sendToken);

router.get('/google', getGoogleAuth);

router.get('/google/callback', receiveGoogleAuth, sendToken)

router.get('/error', (req, res) => handleAuthError);

module.exports = router;