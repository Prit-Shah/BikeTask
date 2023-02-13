const { body } = require('express-validator');

function EvSignupCheck() {
    return [
        body('name').trim().isLength({ min: 1 }),
        body('email').isEmail(),
        body('phone').isMobilePhone("en-IN"),
        body('password').trim().isLength({ min: 8, max: 30 })
    ]
}

function EvLoginCheck() {
    return [
        body('email').isEmail(),
        body('password').trim().isLength({ min: 8, max: 30 })
    ]
}

module.exports = {
    EvSignupCheck,
    EvLoginCheck
}