const express = require('express');
const router = express.Router();
const {} = require('./controller')

router.get('/user/:id', getUser);

module.exports = router;