const {
    param,
    body,
} = require('express-validator')

function EvAddBike() {
    return [
        body('name').trim().isLength({ min: 1 }),
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
        body('name').trim().isLength({ min: 1 }),
    ]
}

function EvParamNum() {
    return [
        param('num').isNumeric()
    ]
}


function EvAddComment() {
    return [
        body('comment').trim().isLength({ min: 1 })
    ]
}

module.exports = {
    EvAddBike,
    EvParamID,
    EvEditBike,
    EvParamNum,
    EvAddComment
}