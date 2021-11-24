const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth');
const { isRequestValidate, validateSigninRequest, validateSignupRequest } = require('../../validators/validateauth');

router.post('/auth/signin', validateSigninRequest, isRequestValidate, signin());
router.post('/auth/signup', validateSignupRequest, isRequestValidate, signup());
router.post('/auth/signout', signout);
router.post('/socket', (req, res) => {
    let io = req.io;
    let body = req.body;
    console.log(body, io);
})
module.exports = router;