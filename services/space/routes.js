const express = require('express');
const router = express.Router();
const space = require(__root + 'services/space/controller');

router.get('/spaces', space.getAll);

module.exports = router;