const mongo = require('mongoose')

const UserSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: 'defaultuser.png'
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongo.model("users", UserSchema);