const { check, validationResult } = require('express-validator');
exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('First Name is required'),

    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),

    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),

    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long'),

    check('mobile')
    .isLength({ min: 10, max:10 })
    .withMessage('Enter correct mobile number')
];

exports.validateSigninRequest = [
    
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),

    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

exports.isRequestValidate = (req, res, next) => {
    
        const errors = validationResult(req);
        if(errors.array().length > 0 ){
            return res.status(400).json({error: errors.array()[0].msg})
        }
        next();
}