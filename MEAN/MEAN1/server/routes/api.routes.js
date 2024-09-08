const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user.controller');

router.use('/user',userControl)

module.exports = router;