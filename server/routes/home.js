const express = require('express');
const { allUserList } = require('../controller/home');
const router = express.Router();

router.post('/alluserlist', allUserList);

module.exports = router;
