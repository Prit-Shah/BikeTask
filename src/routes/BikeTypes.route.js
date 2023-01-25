const express = require('express')
const route = express.Router();
const BikeTypeController = require('../controller/bikeType.controller')
const { EvAddType } = require('../middleware/bikeType.middleware')
const { EvValidate } = require('../middleware/EvValidate.middleware')
const auth = require('../middleware/Auth.middleware')
route.use(auth)

route.post('/', EvAddType(), EvValidate, async (req, res) => {
    const response = await BikeTypeController.addType(req.body);
    return response.message ? res.status(409).send(response) : res.status(201).send(response);
})

route.get('/', async (req, res) => {
    const data = await BikeTypeController.getTypes();
    return data ? res.status(200).send(data) : res.send(401).send("No data");
})

module.exports = route