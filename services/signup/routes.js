const express = require('express');
const router = express.Router();
const { getInfo,
        createBrandAndAttachUser } = require(__root + 'services/signup/controller');

router.get('/signup', getInfo);
router.post('/brand', createBrandAndAttachUser);

module.exports = router;
