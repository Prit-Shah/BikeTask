const mongo = require('mongoose')
require('dotenv').config()
mongo.set('strictQuery', true);
const config = {
    Uname: process.env.MONGO_UNAME,
    Pass: process.env.MONGO_PASS
}
async function connectmongo() {
    try {
        if (process.env.ENV_TYPE === 'dev')
            await mongo.connect(`mongodb+srv://${config.Uname}:${config.Pass}@cluster0.rdssz3x.mongodb.net/BikeTask?retryWrites=true&w=majority`)
        else if (process.env.ENV_TYPE === 'test')
            await mongo.connect(`mongodb+srv://${config.Uname}:${config.Pass}@cluster0.rdssz3x.mongodb.net/BikeTaskTest?retryWrites=true&w=majority`)
    } catch (err) {
        throw new Error("Can't connect to Mongo");
    }
}

module.exports = { connectmongo }