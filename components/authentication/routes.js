const express = require('express');
const router = express.Router();
const {
    getFacebookAuth,
    receiveFacebookAuth,
    receiveFacebookUser,
    getGoogleAuth,
    receiveGoogleAuth,
    receiveGoogleUser
} = require('./controller')
const passport = require('passport');

router.get('/facebook', getFacebookAuth);

router.get('/facebook/callback', receiveFacebookAuth, receiveFacebookUser);

router.get('/google', getGoogleAuth);

router.get('/google/callback', receiveGoogleAuth, receiveGoogleUser)


router.get('/error', (req, res) => handleAuthError);

module.exports = router;