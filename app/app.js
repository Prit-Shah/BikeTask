const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const { connectmongo } = require('../src/mongoose/connect.mongo')
const userroute = require('../src/routes/Users.route')
const biketyperoute = require('../src/routes/BikeTypes.route')
const bikesroute = require('../src/routes/Bikes.route')
async function connect() {
    await connectmongo();
}
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//File Upload
app.set("view engine", "ejs");

connect();
app.use('/user', userroute);
app.use('/biketype', biketyperoute);
app.use('/bike', bikesroute);

module.exports = app;