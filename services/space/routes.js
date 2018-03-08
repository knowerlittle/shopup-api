const express = require('express');
const router = express.Router();
const space = require(__root + 'services/space/controller');

router.get('/spaces', space.getAll);
router.get('/spaces/:id', space.findById);

module.exports = router;