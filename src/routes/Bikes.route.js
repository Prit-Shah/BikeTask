const express = require('express')
const route = express.Router()
const auth = require('../middleware/Auth.middleware')
const { EvAddBike,
    EvParamID,
    EvEditBike,
    EvParamNum,
    EvAddLike,
    EvAddDisLike,
    EvAddComment } = require('../middleware/bike.middleware')
const path = require('path')
const { EvValidate } = require('../middleware/EvValidate.middleware')
const bikeController = require('../controller/bike.controller');
const upload = require('../services/fileupload.service')
route.use(auth);
route.post('/', upload, EvAddBike(), EvValidate, async (req, res) => {
    const response = await bikeController.addBike(req.body, req.file ? req.file.filename : "defaultbike.jpg");
    response.message ? res.status(409).send(response) : res.status(201).send(response);
})
route.patch('/:id', EvParamID(), EvEditBike(), EvValidate, async (req, res) => {
    const response = await bikeController.editBike(req.params.id, req.body);
    response.message ? res.status(409).json(response) : res.status(204).json(response);
})
route.get('/', async (req, res) => {
    const data = await bikeController.getAllBikes();
    data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
})
route.delete('/:id', EvParamID(), EvValidate, async (req, res) => {
    const deleted = await bikeController.deleteBike(req.params.id);
    deleted ? res.status(202).send(deleted) : res.status(204).send("No Data found")
})
route.get('/type/:id', EvParamID(), EvValidate, async (req, res) => {
    const data = await bikeController.getByType(req.params.id);
    data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
})
route.get('/recent/:num', EvParamNum(), EvValidate, async (req, res) => {
    const data = await bikeController.getRecent(req.params.num);
    data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
})
route.post('/like/:id', EvParamID(), EvAddLike(), EvValidate, async (req, res) => {
    const data = await bikeController.addLike(req.params.id, req.body);
    data ? res.status(201).send(data) : res.status(401).send("Already Liked")
})
route.get('/mostLiked/:num', EvParamNum(), EvValidate, async (req, res) => {
    const data = await bikeController.getMostLiked(req.params.num);
    data ? res.status(200).send(data) : res.status(401).send("Something went wrong");
})
route.post('/comment/:id', EvParamID(), EvAddComment(), EvValidate, async (req, res) => {
    const data = await bikeController.addComment(req.params.id, req.body);
    data ? res.status(201).send(data) : res.status(401).send("Something went wrong");
})
route.get('/file/:name', async (req, res) => {
    const data = await bikeController.getPhoto(req.params.name);
    data ? res.status(200).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "bikes", data.photo)) : res.status(401).sendFile(path.join(__dirname, "..", "..", "public", "uploads", "bikes", "defaultbike.jpg"));
})
route.post('/dislike/:id', EvParamID(), EvAddDisLike(), EvValidate, async (req, res) => {
    const data = await bikeController.addDisLike(req.params.id, req.body);
    data.message ? res.status(409).send(data) : res.status(201).send(data)
})
module.exports = route