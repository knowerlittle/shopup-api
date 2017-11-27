const passport = require('passport');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');


const getFacebookAuth = passport.authenticate('facebook', {
    display: 'touch',
    scope: ['email', 'public_profile']
});

const receiveFacebookAuth = passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/error'
});

const receiveFacebookUser = (req, res, next) => {
    console.log(req.user)
    res.json({
        user: req.user
    });
}

const getGoogleAuth = passport.authenticate('google', {
    scope: ['email', 'profile']
});

const receiveGoogleAuth = passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/error'
})

const receiveGoogleUser = (req, res) => {
    res.send({
        user: req.user
    })
};

const handleAuthError = (req, res) => {
    console.log(req.body)
    res.json(req.body)
}

module.exports = {
    getFacebookAuth,
    receiveFacebookAuth,
    receiveFacebookUser,
    getGoogleAuth,
    receiveGoogleAuth,
    receiveGoogleUser
}