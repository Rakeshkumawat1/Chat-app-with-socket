const express = require('express');
const router = express.Router();

router.post('/socket', (req, res) => {
    let io = req.io;
    let body = req.body;
    console.log(body);
    res.send("done")
})
module.exports = router;