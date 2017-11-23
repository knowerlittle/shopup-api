const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config/config');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${config.url}/auth/facebook/callback`,
        profileFields: ['id','displayName', 'name', 'emails']
    },(accessToken, refreshToken, profile, done) => done(null, profile)));

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `http://127.0.0.1/auth/twitter/callback`
    }, (token, tokenSecret, profile, done) => done(null, profile)));
}; 