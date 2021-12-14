const express = require('express');
const { allUserList, privateUserSocket } = require('../controller/home');
const router = express.Router();

router.post('/alluserlist', allUserList);
router.post('/privateUserSocket', privateUserSocket);

module.exports = router;
