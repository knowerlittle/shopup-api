const express = require('express');
const router = express.Router();
const { getUser } = require('./controller')

router.get('/user/:id', getUser);

module.exports = router;