const express = require('express');
const router = express.Router();
const { getInfo,
        createBrand } = require(__root + 'services/signup/controller');

router.get('/signup', getInfo);
router.post('/signup/brand', createBrand);

module.exports = router;