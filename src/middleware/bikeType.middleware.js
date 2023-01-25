const { body } = require('express-validator')

function EvAddType() {
    return [
        body('name').isLength({ min: 1 }),
        body('createdBy').isMongoId(),
    ]
}

module.exports = {
    EvAddType,
}