const express = require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const path = require('path')
const route = express.Router();
const userController = require('../controller/user.controller')
const { EvSignupCheck, EvLoginCheck } = require('../middleware/user.middleware')
const { EvValidate } = require('../middleware/EvValidate.middleware')
// Step 5 - set up multer for storing uploaded files

const upload = require('../services/fileupload.service')
const auth = require('../middleware/Auth.middleware');

route.post('/signup', upload, EvSignupCheck(), EvValidate, async (req, res) => {
    try {
        const response = await userController.addUser(req.body, req.file ? req.file.filename : "defaultuser.png");
        response.message ? res.status(409).send(response) : res.status(201).send(response);
    } catch (e) {

        res.status(409).send(e.message)
    }
}, (error, req, res, next) => {
    if (error.message == "File too large") { return res.status(409).send({ message: "Max File Size 500KB" }) }
    res.status(409).send({ message: error.message })
})

route.get('/login', EvLoginCheck(), EvValidate, async (req, res) => {
    try {
        const available = await userController.loginUser(req.body);
        if (available) { available.token = jwt.sign(available, process.env.JSONTOKEN, { expiresIn: 60 * 60 }); }
        available ? res.status(200).send(available) : res.status(403).send("Invalid Email or Password");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})

route.get('/file/:name', auth, async (req, res) => {
    try {
        const data = await userController.getPhoto(req.params.name);
        data ? res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "users", data.photo)) : res.status(401).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "users", "defaultuser.jpg"));
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})

module.exports = route;