const { body } = require('express-validator');
function EvSignupCheck() {
    return [
        body('name').isLength({ min: 1 }),
        body('email').isEmail(),
        body('phone').isMobilePhone("en-IN"),
        body('password').isLength({ min: 8, max: 30 })
    ]
}
function EvLoginCheck() {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8, max: 30 })
    ]
}

module.exports = {
    EvSignupCheck,
    EvLoginCheck
}