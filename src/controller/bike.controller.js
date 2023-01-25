const bikeService = require('../services/bike.service')

async function addBike(bike, filename) {
    return await bikeService.addBike(bike, filename);
}
async function editBike(id, bike) {
    return await bikeService.editBike(id, bike);
}
async function getAllBikes() {
    return await bikeService.getAllBikes();
}
async function deleteBike(id) {
    return await bikeService.deleteBike(id);
}
async function getByType(id) {
    return await bikeService.getByType(id);
}
async function getRecent(num) {
    return await bikeService.getRecent(num);
}
async function addLike(id, user) {
    return await bikeService.addLike(id, user);
}
async function getMostLiked(num) {
    return await bikeService.getMostLiked(num);
}
async function addComment(id, user) {
    return await bikeService.addComment(id, user);
}
async function getPhoto(name) {
    return await bikeService.getPhoto(name);
}
async function addDisLike(id, user) {
    return await bikeService.addDisLike(id, user);
}
module.exports = {
    addBike,
    editBike,
    getAllBikes,
    deleteBike,
    getByType,
    getRecent,
    addLike,
    getMostLiked,
    addComment,
    getPhoto,
    addDisLike
}