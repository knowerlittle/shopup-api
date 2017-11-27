const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../config/config');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${config.url}/auth/facebook/callback`,
        profileFields: ['id','displayName', 'name', 'emails']
    },(accessToken, refreshToken, profile, done) => done(null, profile)));
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    }, (request, accessToken, refreshToken, profile, done) => {
            process.nextTick(function () {
                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ));
    // passport.serializeUser(function (user, callback) {
    //     console.log('serializing user.');
    //     callback(null, user.id);
    // });

    // passport.deserializeUser(function (user, callback) {
    //     console.log('deserialize user.');
    //     callback(null, user.id);
    // });
}; 