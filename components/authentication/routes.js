const router = require('express').Router();
const { facebookLogin } = require('./controller');

router.post('/facebook', facebookLogin);
// router.post('/google', googleLogin);

module.exports = router;
