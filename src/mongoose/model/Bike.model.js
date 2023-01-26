const mongo = require('mongoose')

const BikeSchema = mongo.Schema({
    createdBy: {
        type: mongo.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    typeID: {
        type: mongo.Types.ObjectId,
        ref: 'biketypes',
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    likes: {
        type: [
            {
                type: mongo.Types.ObjectId,
                ref: "users",
                required: true,
            }
        ]        
    },
    dislikes: {
        type: [
            {
                type: mongo.Types.ObjectId,
                ref: "users",
                required: true,
            }
        ]
    },
    comments: {
        type: [
            {
                userID: {
                    type: mongo.Types.ObjectId,
                    ref: "users",
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                }
            }]
    },
    photo: {
        type: String,
        default: 'defaultbike.jpg'
    },
})

module.exports = mongo.model('bikes', BikeSchema);