const {
    param,
    body,
} = require('express-validator')

function EvAddBike() {
    return [
        body('createdBy').isMongoId(),
        body('name').isLength({ min: 1 }),
        body('typeID').isMongoId()
    ]
}

function EvParamID() {
    return [
        param('id').isMongoId(),
    ]
}

function EvEditBike() {
    return [
        body('name').isLength({ min: 1 }),
    ]
}

function EvParamNum() {
    return [
        param('num').isNumeric()
    ]
}

function EvAddLike() {
    return [
        body('id').isMongoId(),
    ]
}
function EvAddDisLike() {
    return [
        body('id').isMongoId(),
    ]
}

function EvAddComment() {
    return [
        body('id').isMongoId(),
        body('comment').isLength({ min: 1 })
    ]
}

module.exports = {
    EvAddBike,
    EvParamID,
    EvEditBike,
    EvParamNum,
    EvAddLike,
    EvAddDisLike,
    EvAddComment
}