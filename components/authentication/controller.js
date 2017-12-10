const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const processFacebookUser = require('./facebook.js')
const processGoogleUser = require('./google.js')

const socialLogin = async(req, res, next) => {
    const profile = req.body.profile;
    const user = profile.provider === 'facebook' ? await processFacebookUser(profile) : await processGoogleUser(profile);
    const token = createToken(user);
    res.status(200).json({
        token: token
    });
}

const createToken = (user) => jwt.sign({
    data: req.user._id
}, process.env.SECRET, {
    expiresIn: '1h'
});



module.exports = {
    socialLogin,
}