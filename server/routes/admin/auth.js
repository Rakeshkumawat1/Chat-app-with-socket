const express = require('express');

const { signup, signin, signout } = require('../../controller/admin/auth');
const {isRequestValidate, validateSigninRequest } = require('../../validators/validateauth');
const router = express.Router();




router.post('/auth/signin' ,validateSigninRequest, isRequestValidate,signin());


router.post('/auth/signout' , signout);





module.exports = router;