const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const path = require('path')
const cors = require('cors')
const { connectmongo } = require('../src/mongoose/connect.mongo')
const userroute = require('../src/routes/Users.route')
const biketyperoute = require('../src/routes/BikeTypes.route')
const bikesroute = require('../src/routes/Bikes.route')
async function connect() {
    try {
        await connectmongo();
    }
    catch (err) {
        console.log(`\u001b[1;31m${err.message}`);
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "../public")))


//File Upload
app.set("view engine", "ejs");

connect();
app.use('/user', userroute);
app.use('/biketype', biketyperoute);
app.use('/bike', bikesroute);

module.exports = app;