const express = require('express');
const router = express.Router();
const { brandSignup } = require(__root + 'services/signup/controller');

router.get('/signup/brand', brandSignup);

module.exports = router;