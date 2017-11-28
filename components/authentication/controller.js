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

const getGoogleAuth = passport.authenticate('google', {
    scope: ['email', 'profile']
});

const receiveGoogleAuth = passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/error'
})

const sendToken = async(req, res, next) => {
   const token = await jwt.sign({
        data: req.user
    }, process.env.SECRET, { expiresIn: '1h' });
    res.send({
        token: token
    });
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