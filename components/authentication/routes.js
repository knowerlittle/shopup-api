const express = require('express');
const router = express.Router();
const { facebook } = require('./controller')
const passport = require('passport');

router.get('/facebook',
    passport.authenticate('facebook', { display: 'touch', scope: ['email', 'public_profile']}));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: '/auth/hi' }),
    function (req, res) {
        res.json({user: req.user});
    });

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', { session: false, failureRedirect: '/auth/hi' }),
    function (req, res) {
        console.log(req.user)
        res.json({ user: req.user });
    });

router.get('error', (req, res) => {
    console.log(require)
    res.json(req.body)
});

module.exports = router;