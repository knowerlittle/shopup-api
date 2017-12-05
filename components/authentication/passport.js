const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../../config/config');

const { processFacebookUser, processGoogleUser } = require('../user/utilities')

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${config.url}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'name', 'emails'],
        passReqToCallback: true
    }, processFacebookUser));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.url}/auth/google/callback`,
        passReqToCallback: true
    }, processGoogleUser));

};
