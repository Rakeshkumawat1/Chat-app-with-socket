const express = require('express');
const { newUsers } = require('../controller/newUsers');
const router = express.Router();

router.post('/addnewuser', newUsers)

module.exports = router;
