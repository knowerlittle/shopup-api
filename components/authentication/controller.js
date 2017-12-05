const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const getFacebookAuth = passport.authenticate('facebook', {
    display: 'touch',
    scope: ['email', 'public_profile']
});

const receiveFacebookAuth = passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/error'
});

const getGoogleAuth = passport.authenticate('google', {
    scope: ['email', 'profile']
});

const receiveGoogleAuth = passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/error'
})

const sendToken = async(req, res, next) => {
    // console.log(req)
    const token = await jwt.sign({
        data: req.user
    }, process.env.SECRET, {
        expiresIn: '1h'
    });
    res.setHeader('x-auth-token', token);
    res.status(200).send(req.auth);
}

const handleAuthError = (req, res) => {
    console.log(req.body)
    res.json(req.body)
}

module.exports = {
    getFacebookAuth,
    receiveFacebookAuth,
    getGoogleAuth,
    receiveGoogleAuth,
    sendToken
}