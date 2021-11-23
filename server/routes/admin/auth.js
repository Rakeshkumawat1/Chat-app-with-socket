const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require('../../controller/admin/auth');
const { isRequestValidate, validateSigninRequest, validateSignupRequest } = require('../../validators/validateauth');

router.post('/auth/signin', validateSigninRequest, isRequestValidate, signin());
router.post('/auth/signup', validateSignupRequest, isRequestValidate, signup());
router.post('/auth/signout', signout);

module.exports = router;