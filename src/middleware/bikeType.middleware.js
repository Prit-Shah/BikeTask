const { body } = require('express-validator')

function EvAddType() {
    return [
        body('name').trim().isLength({ min: 1 }),
    ]
}

module.exports = {
    EvAddType,
}