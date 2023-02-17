const express = require('express')
const route = express.Router()
const auth = require('../middleware/Auth.middleware')
const { EvAddBike,
    EvParamID,
    EvEditBike,
    EvParamNum,
    EvAddComment } = require('../middleware/bike.middleware')
const path = require('path')
const { EvValidate } = require('../middleware/EvValidate.middleware')
const bikeController = require('../controller/bike.controller');
const upload = require('../services/fileupload.service')
route.use(auth);
route.post('/', upload, EvAddBike(), EvValidate, async (req, res) => {
    try {
        const response = await bikeController.addBike(req, req.file ? req.file.filename : "defaultbike.jpg");
        response.message ? res.status(409).send(response) : res.status(201).send(response);
    } catch (err) {
        res.status(409).send(err.message)
    }
}, (error, req, res, next) => {
    if (error.message == "File too large") { return res.status(409).send({ message: "Max File Size 500KB" }) }
    res.status(409).send({ message: error.message })
})
route.patch('/:id', EvParamID(), EvEditBike(), EvValidate, async (req, res) => {
    try {
        const response = await bikeController.editBike(req.params.id, req.body);
        response.message ? res.status(409).json(response) : res.status(204).json(response);
    } catch (err) {
        res.status(409).send(err.message)
    }
})
route.get('/:id', EvParamID(), EvValidate, async (req, res) => {
    try {
        const response = await bikeController.getByID(req.params.id);
        response.message ? res.status(409).json(response) : res.status(200).send(response);
    } catch (err) {
        res.status(409).send(err.message)
    }
})
route.get('/', async (req, res) => {
    try {
        const data = await bikeController.getAllBikes();
        data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.delete('/:id', EvParamID(), EvValidate, async (req, res) => {
    try {
        const deleted = await bikeController.deleteBike(req.params.id);
        deleted ? res.status(202).send(deleted) : res.status(204).send("No Data found")
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.get('/type/:id', EvParamID(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.getByType(req.params.id);
        data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.get('/recent/:num', EvParamNum(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.getRecent(req.params.num);
        data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.post('/like/:id', EvParamID(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.addLike(req.params.id, req);
        data ? res.status(201).send(data) : res.status(401).send("Already Liked")
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.get('/mostLiked/:num', EvParamNum(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.getMostLiked(req.params.num);
        data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.post('/comment/:id', EvParamID(), EvAddComment(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.addComment(req.params.id, req);
        data ? res.status(201).send(data) : res.status(401).send("Something went wrong");
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.get('/file/:name', async (req, res) => {
    try {
        const data = await bikeController.getPhoto(req.params.name);
        data ? res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "bikes", data.photo)) : res.status(401).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "bikes", "defaultbike.jpg"));
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
route.post('/dislike/:id', EvParamID(), EvValidate, async (req, res) => {
    try {
        const data = await bikeController.addDisLike(req.params.id, req);
        data.message ? res.status(409).send(data) : res.status(201).send(data)
    } catch (err) {
        res.status(409).send({ Error: err.message })
    }
})
module.exports = route
