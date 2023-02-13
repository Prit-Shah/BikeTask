const mongo = require('mongoose')

const BikeTypeSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongo.Types.ObjectId,
        ref: "users",
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongo.model("biketypes", BikeTypeSchema);